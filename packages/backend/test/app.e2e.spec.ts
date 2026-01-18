import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { beforeEach, describe, it } from 'vitest'
import { JwtStrategy } from '../src/auth/strategy/jwt.strategy'
import configuration from '../src/config/configuration'
import { HealthModule } from '../src/health/health.module'

describe('HealthController (e2e)', () => {
  let app: INestApplication
  let _configService: ConfigService
  let _jwtStrategy: JwtStrategy

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule, ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
      providers: [],
    }).compile()

    _configService = moduleFixture.get<ConfigService>(ConfigService)

    console.log('JWT Audience:', _configService.get('cognito.jwksUri'))

    // _jwtStrategy = moduleFixture.get<JwtStrategy>(JwtStrategy)

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/health (GET)', () => {
    const expected = {
      message: 'health check is OK!',
    }
    return request.default(app.getHttpServer()).get('/health').expect(200).expect(expected)
  })
})

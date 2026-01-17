import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { beforeEach, describe, it } from 'vitest'
import { AppModule } from '../src/app.module'

describe('HealthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

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

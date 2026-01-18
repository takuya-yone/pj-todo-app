import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import configuration from '../config/configuration'
import { HealthController } from './health.controller'
import { GetHealthDto } from './health.dto'

import { HealthService } from './health.service'

describe('HealthController', () => {
  let healthController: HealthController
  let fakeHealthService: Partial<HealthService>

  beforeEach(async () => {
    fakeHealthService = {
      generateJwtForUser: async () => {
        return Promise.resolve(new GetHealthDto('jwtjwtjwt'))
      },
    }
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: fakeHealthService,
        },
      ],
    }).compile()

    // healthService = moduleFixture.get<HealthService>(HealthService)

    healthController = moduleFixture.get<HealthController>(HealthController)
  })

  it('should be defined', () => {
    console.log(healthController.getJwt)
    expect(healthController).toBeDefined()
  })

  it('should return "health check is OK!"', async () => {
    expect(await healthController.check()).toEqual(new GetHealthDto('health check is OK!'))
  })

  it('should return "jwtjwtjwt"', async () => {
    // const _spy = vi.spyOn(healthService, 'generateJwtForUser').mockImplementation(async () => {
    //   return new GetHealthDto('jwtjwtjwt')
    // })
    const userCredsDto = { username: 'testuser', password: 'testpassword' }
    // const bbb = new HealthController(healthService)

    expect(await healthController.getJwt(userCredsDto)).toEqual(new GetHealthDto('jwtjwtjwt'))
  })
})

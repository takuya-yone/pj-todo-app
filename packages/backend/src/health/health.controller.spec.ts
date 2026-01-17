import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { HealthController } from './health.controller'
import { GetHealthDto } from './health.dto'

describe('HealthController', () => {
  let healthController: HealthController

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile()

    healthController = moduleRef.get<HealthController>(HealthController)
  })

  describe('get', () => {
    it('should return "health check is OK!"', async () => {
      expect(await healthController.get()).toEqual(new GetHealthDto('health check is OK!'))
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile()

    appController = moduleRef.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "health check is OK!"', async () => {
      expect(await appController.get()).toBe('health check is OK!')
    })
  })
})

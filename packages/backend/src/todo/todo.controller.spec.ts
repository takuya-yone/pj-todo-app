import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { assert, beforeEach, describe, expect, it } from 'vitest'
import configuration from '../config/configuration'
import { PrismaService } from '../prisma/prisma.service'
import { TodoController } from './todo.controller'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoService } from './todo.service'

const mockDto = new CreateTodoDto('titletitle', 'commentcomment')

describe('TodoController', () => {
  let todoController: TodoController
  let todoService: TodoService
  let configService: ConfigService
  let prismaService: PrismaService

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
      controllers: [],
      providers: [],
    }).compile()
    configService = moduleFixture.get<ConfigService>(ConfigService)

    prismaService = new PrismaService(configService)
    todoService = new TodoService(prismaService)
    todoController = new TodoController(todoService)
  })

  describe('Todo', () => {
    it('create', async () => {
      const result = await todoController.create(mockDto)
      expect(result.title).toBe(mockDto.title)
      expect(result.comment).toBe(mockDto.comment)
      expect(result.complete).toBe(false)
    })
    it('get', async () => {
      const result = await todoController.get()
      expect(result.length).toBeGreaterThan(1)
      const last = result.pop()
      assert(last)
      expect(last.title).toBe(mockDto.title)
      expect(last.comment).toBe(mockDto.comment)
    })
    it('update', async () => {
      const item = (await todoController.get()).pop()
      assert(item)

      const mockUpdateDto = new UpdateTodoDto(item.id, 'titletitle2', 'commentcomment2', true)
      await todoController.update(mockUpdateDto)

      const newItem = (await todoController.get()).pop()
      assert(newItem)
      expect(newItem.id).toBe(mockUpdateDto.id)
      expect(newItem.title).toBe(mockUpdateDto.title)
      expect(newItem.comment).toBe(mockUpdateDto.comment)
      expect(newItem.complete).toBe(mockUpdateDto.complete)
    })
    it('delete', async () => {
      const item = (await todoController.get()).pop()
      assert(item)

      const mockDeleteDto = new DeleteTodoDto(item.id)
      await todoController.delete(mockDeleteDto)
      const newItem = (await todoController.get()).pop()
      expect(newItem?.id).not.toBe(mockDeleteDto.id)
    })
  })
})

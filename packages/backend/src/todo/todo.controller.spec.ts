import assert from 'node:assert'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '../prisma/prisma.service'
import { TodoController } from './todo.controller'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoService } from './todo.service'

describe('TodoController', () => {
  let todoController: TodoController
  let todoService: TodoService
  let prismaService: PrismaService

  const mockDto = new CreateTodoDto('titletitle', 'commentcomment')

  beforeEach(async () => {
    prismaService = new PrismaService()
    todoService = new TodoService(prismaService)
    todoController = new TodoController(todoService)
  })

  describe('Todo', () => {
    it('postTodo', async () => {
      const result = await todoController.postTodo(mockDto)
      expect(result.title).toBe(mockDto.title)
      expect(result.comment).toBe(mockDto.comment)
      expect(result.complete).toBe(false)
    })
    it('getTodo', async () => {
      const result = await todoController.getTodo()
      expect(result.length).toBeGreaterThan(1)

      const last = result.pop()
      assert(last)
      expect(last.title).toBe(mockDto.title)
      expect(last.comment).toBe(mockDto.comment)
    })
    it('updateTodo', async () => {
      const item = (await todoController.getTodo()).pop()
      assert(item)

      const mockUpdateDto = new UpdateTodoDto(item.id, 'titletitle2', 'commentcomment2', true)
      await todoController.putTodo(mockUpdateDto)

      const newItem = (await todoController.getTodo()).pop()
      assert(newItem)
      expect(newItem.id).toBe(mockUpdateDto.id)
      expect(newItem.title).toBe(mockUpdateDto.title)
      expect(newItem.comment).toBe(mockUpdateDto.comment)
      expect(newItem.complete).toBe(mockUpdateDto.complete)
    })
    it('deleteTodo', async () => {
      const item = (await todoController.getTodo()).pop()
      assert(item)

      const mockDeleteDto = new DeleteTodoDto(item.id)
      await todoController.deleteTodo(mockDeleteDto)
      const newItem = (await todoController.getTodo()).pop()
      expect(newItem?.id).not.toBe(mockDeleteDto.id)
    })
  })
})

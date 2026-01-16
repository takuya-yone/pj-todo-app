import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { TodoController } from './todo.controller'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoService } from './todo.service'

describe('TodoController', () => {
  let todoController: TodoController

  const mockDto = new CreateTodoDto('titletitle', 'commentcomment')

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, PrismaService],
    }).compile()

    todoController = app.get<TodoController>(TodoController)
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
      expect(last.title).toBe(mockDto.title)
      expect(last.comment).toBe(mockDto.comment)
    })
    it('updateTodo', async () => {
      const id = (await todoController.getTodo()).pop().id
      const mockUpdateDto = new UpdateTodoDto(id, 'titletitle2', 'commentcomment2', true)
      await todoController.putTodo(mockUpdateDto)
      const newItem = (await todoController.getTodo()).pop()
      expect(newItem.id).toBe(mockUpdateDto.id)
      expect(newItem.title).toBe(mockUpdateDto.title)
      expect(newItem.comment).toBe(mockUpdateDto.comment)
      expect(newItem.complete).toBe(mockUpdateDto.complete)
    })
    it('deleteTodo', async () => {
      const id = (await todoController.getTodo()).pop().id
      const mockDeleteDto = new DeleteTodoDto(id)
      await todoController.deleteTodo(mockDeleteDto)
      const newItem = (await todoController.getTodo()).pop()
      expect(newItem.id).not.toBe(mockDeleteDto.id)
    })
  })
})

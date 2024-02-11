import { Controller } from '@nestjs/common'
import { Delete, Get, Post, Put } from '@nestjs/common'
import { TodoItem } from '@prisma/client'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodo(): Promise<TodoItem[]> {
    return this.todoService.getTodos()
  }

  @Post()
  postTodo(): string[] {
    return this.todoService.getDummy()
  }

  @Put()
  putTodo(): string[] {
    return this.todoService.getDummy()
  }

  @Delete()
  deleteTodo(): string[] {
    return this.todoService.getDummy()
  }
}

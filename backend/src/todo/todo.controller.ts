import { Controller } from '@nestjs/common'
import { Delete, Get, Post, Put } from '@nestjs/common'
import { TodoService } from './todo.service'
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo(): string[] {
    return this.todoService.getTodos()
  }

  @Post()
  postTodo(): string[] {
    return this.todoService.getTodos()
  }

  @Put()
  putTodo(): string[] {
    return this.todoService.getTodos()
  }

  @Delete()
  deleteTodo(): string[] {
    return this.todoService.getTodos()
  }
}

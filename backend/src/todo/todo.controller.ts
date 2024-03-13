import { Controller } from '@nestjs/common'
import { Body, Delete, Get, Post, Put } from '@nestjs/common'
import { TodoItem } from '@prisma/client'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodo(): Promise<TodoItem[]> {
    return this.todoService.getTodos()
  }

  @Post()
  async postTodo(@Body() createDto: CreateTodoDto): Promise<TodoItem> {
    return this.todoService.createTodo(createDto)
  }

  @Put()
  async putTodo(@Body() updateDto: UpdateTodoDto): Promise<TodoItem> {
    return this.todoService.updateTodo(updateDto)
  }

  @Delete()
  deleteTodo(@Body() deleteDto: DeleteTodoDto): Promise<TodoItem> {
    return this.todoService.deleteTodo(deleteDto)
  }
}

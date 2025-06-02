import { Controller } from '@nestjs/common'
import { Body, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { TodoItem } from '@prisma/client'
import { CreateTodoDto, DeleteTodoDto, GetTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetTodoDto],
  })
  @Get()
  async getTodo(): Promise<GetTodoDto[]> {
    const todos = await this.todoService.getTodos()
    return todos.map((item) => new GetTodoDto(item))
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateTodoDto,
  })
  @Post()
  async postTodo(@Body() createDto: CreateTodoDto): Promise<TodoItem> {
    return await this.todoService.createTodo(createDto)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateTodoDto,
  })
  @Put()
  async putTodo(@Body() updateDto: UpdateTodoDto): Promise<TodoItem> {
    return await this.todoService.updateTodo(updateDto)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteTodoDto,
  })
  @Delete()
  async deleteTodo(@Body() deleteDto: DeleteTodoDto): Promise<TodoItem> {
    return await this.todoService.deleteTodo(deleteDto)
  }
}

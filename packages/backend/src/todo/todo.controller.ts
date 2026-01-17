import { Body, Controller, Delete, Get, HttpStatus, Post, Put, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { JwtGuard } from '../auth/guard/jwt.guard'
import { CreateTodoDto, DeleteTodoDto, GetTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetTodoDto],
  })
  @Get()
  async get(): Promise<GetTodoDto[]> {
    const todos = await this.todoService.getTodos()
    return todos.map((item) => new GetTodoDto(item))
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetTodoDto,
  })
  @Post()
  async create(@Body() createDto: CreateTodoDto): Promise<GetTodoDto> {
    const todo = await this.todoService.createTodo(createDto)
    return new GetTodoDto(todo)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetTodoDto,
  })
  @Put()
  async update(@Body() updateDto: UpdateTodoDto): Promise<GetTodoDto> {
    const todo = await this.todoService.updateTodo(updateDto)
    return new GetTodoDto(todo)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetTodoDto,
  })
  @Delete()
  async delete(@Body() deleteDto: DeleteTodoDto): Promise<GetTodoDto> {
    const todo = await this.todoService.deleteTodo(deleteDto)
    return new GetTodoDto(todo)
  }
}

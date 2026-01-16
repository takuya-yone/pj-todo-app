import { Injectable } from '@nestjs/common'
import { TodoItem } from '../../generated/prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(): Promise<TodoItem[]> {
    return this.prisma.todoItem.findMany()
  }

  async createTodo(item: CreateTodoDto): Promise<TodoItem> {
    return this.prisma.todoItem.create({ data: item })
  }

  async updateTodo(item: UpdateTodoDto): Promise<TodoItem> {
    return this.prisma.todoItem.update({
      where: {
        id: item.id,
      },
      data: item,
    })
  }
  async deleteTodo(item: DeleteTodoDto): Promise<TodoItem> {
    return this.prisma.todoItem.delete({
      where: {
        id: item.id,
      },
    })
  }

  // getDummy(): string[] {
  //   return ['aaa', 'bbb', 'ccc']
  // }
}

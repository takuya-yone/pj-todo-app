import { Injectable } from '@nestjs/common'
import { TodoItem } from '../../generated/prisma/client'
import { TodoItemGetPayload } from '../../generated/prisma/models'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'

type TodoItemWithMetadata = TodoItemGetPayload<{
  include: { itemMetadatas: true }
}>

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(): Promise<TodoItemWithMetadata[]> {
    const todos = await this.prisma.todoItem.findMany({
      include: {
        itemMetadatas: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return todos
  }

  async createTodo(item: CreateTodoDto): Promise<TodoItem> {
    const todo = this.prisma.todoItem.create({ data: item })
    return todo
  }

  async updateTodo(item: UpdateTodoDto): Promise<TodoItem> {
    const todo = this.prisma.todoItem.update({
      where: {
        id: item.id,
      },
      data: item,
    })
    return todo
  }
  async deleteTodo(item: DeleteTodoDto): Promise<TodoItem> {
    const todo = this.prisma.todoItem.delete({
      where: {
        id: item.id,
      },
    })
    return todo
  }
}

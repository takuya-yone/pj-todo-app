import { Injectable } from '@nestjs/common'
import { TodoItem } from '../../generated/prisma/client'
import { TodoItemGetPayload } from '../../generated/prisma/models'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTodoDto, UpdateTodoDto } from './todo.dto'

export type TodoItemWithMetadata = TodoItemGetPayload<{
  include: { itemMetadatas: true }
}>

/**
 * TodoItem の永続化を担う層。
 * Prisma への依存をこのクラスに閉じ込め、上位（TodoService）からはクエリの詳細を隠す。
 */
@Injectable()
export class TodoRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<TodoItemWithMetadata[]> {
    return await this.prisma.todoItem.findMany({
      include: {
        itemMetadatas: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  async create(data: CreateTodoDto): Promise<TodoItem> {
    return await this.prisma.todoItem.create({ data })
  }

  async update(data: UpdateTodoDto): Promise<TodoItem> {
    return await this.prisma.todoItem.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<TodoItem> {
    return await this.prisma.todoItem.delete({
      where: { id },
    })
  }
}

import { Injectable } from '@nestjs/common'
import { TodoItem } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(): Promise<TodoItem[]> {
    return this.prisma.todoItem.findMany()
  }

  getDummy(): string[] {
    return ['aaa', 'bbb', 'ccc']
  }
}

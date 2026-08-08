import { Injectable } from '@nestjs/common'
import { TodoItem } from '../../generated/prisma/client'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './todo.dto'
import { TodoItemWithMetadata, TodoRepository } from './todo.repository'

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async getTodos(): Promise<TodoItemWithMetadata[]> {
    return await this.todoRepository.findMany()
  }

  async createTodo(item: CreateTodoDto): Promise<TodoItem> {
    return await this.todoRepository.create(item)
  }

  async updateTodo(item: UpdateTodoDto): Promise<TodoItem> {
    return await this.todoRepository.update(item)
  }

  async deleteTodo(item: DeleteTodoDto): Promise<TodoItem> {
    return await this.todoRepository.delete(item.id)
  }
}

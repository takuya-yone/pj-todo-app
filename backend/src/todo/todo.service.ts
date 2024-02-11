import { Injectable } from '@nestjs/common'

@Injectable()
export class TodoService {
  getTodos(): string[] {
    return ['aaa', 'bbb']
  }
}

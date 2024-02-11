import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly comment: string
}

export class CreateTodoDtoPT extends PartialType(CreateTodoDto) {}

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly comment: string
}

export class UpdateTodoDtoPT extends PartialType(UpdateTodoDto) {}

export class DeleteTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string
}

export class DeleteTodoDtoPT extends PartialType(DeleteTodoDto) {}

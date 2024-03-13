import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly comment: string

  constructor(title: string, comment: string) {
    this.title = title
    this.comment = comment
  }
}

export class CreateTodoDtoPT extends PartialType(CreateTodoDto) {}

export class UpdateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly comment: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly complete: boolean

  constructor(id: string, title: string, comment: string, complete: boolean) {
    this.id = id
    this.title = title
    this.comment = comment
    this.complete = complete
  }
}

export class UpdateTodoDtoPT extends PartialType(UpdateTodoDto) {}

export class DeleteTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string

  constructor(id: string) {
    this.id = id
  }
}

export class DeleteTodoDtoPT extends PartialType(DeleteTodoDto) {}

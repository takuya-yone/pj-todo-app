import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GetHealthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly message: string

  constructor(message: string) {
    this.message = message
  }
}

export class GetHealthDtoPT extends PartialType(GetHealthDto) {}

export class UserCredsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

export class UserCredsDtoPT extends PartialType(UserCredsDto) {}

export class MessageEventDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly data: string | object

  @ApiProperty()
  @IsString()
  readonly id?: string

  @ApiProperty()
  @IsString()
  readonly type?: string

  @ApiProperty()
  readonly retry?: number

  constructor(data: string | object, id?: string, type?: string, retry?: number) {
    this.data = data
    this.id = id
    this.type = type
    this.retry = retry
  }
}

export class MessageEventDtoPT extends PartialType(MessageEventDto) {}

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

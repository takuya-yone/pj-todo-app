import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

@Controller('')
export class AppController {
  @ApiResponse({
    status: HttpStatus.OK,
    type: [String],
  })
  @Get()
  async get(): Promise<string> {
    return 'health check is OK!'
  }
}

import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetHealthDto } from './health.dto'

@Controller('health')
export class HealthController {
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetHealthDto,
  })
  @Get()
  async get(): Promise<GetHealthDto> {
    return new GetHealthDto('health check is OK!')
  }
}

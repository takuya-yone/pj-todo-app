import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { JwtGuard } from '../auth/guard/jwt.guard'
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

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetHealthDto,
  })
  @ApiBearerAuth()
  @Get('auth')
  @UseGuards(JwtGuard)
  async authCheck(): Promise<GetHealthDto> {
    return new GetHealthDto('health check w/ Auth is OK!')
  }
}

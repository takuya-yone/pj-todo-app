import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { JwtGuard } from '../auth/guard/jwt.guard'
import { GetHealthDto, UserCredsDto } from './health.dto'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetHealthDto,
  })
  @Get()
  async check(): Promise<GetHealthDto> {
    return new GetHealthDto('health check is OK!')
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetHealthDto,
  })
  @Post('jwt')
  async getJwt(@Body() userCredsDto: UserCredsDto): Promise<GetHealthDto> {
    return this.healthService.generateJwtForUser(userCredsDto.username, userCredsDto.password)
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

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetHealthDto,
  })
  @Get('deep')
  async deepCheck(): Promise<GetHealthDto> {
    return this.healthService.getHealthMessage()
  }
}

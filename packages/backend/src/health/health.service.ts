import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { GetHealthDto } from './health.dto'

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  async getHealthMessage(): Promise<GetHealthDto> {
    const record = await this.prisma.healthMessage.findFirst()
    return new GetHealthDto(record?.message ?? 'No health message found on DB.')
  }
}

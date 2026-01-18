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

  async generateJwtForUser(username: string, _password: string): Promise<GetHealthDto> {
    // Dummy implementation for JWT generation
    // In a real application, you would validate the user credentials and generate a JWT
    return new GetHealthDto(`JWT for user ${username} generated successfully.`)
  }
}

import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { GetHealthDto } from './health.dto'

@Injectable()
export class HealthService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async getHealthMessage(): Promise<GetHealthDto> {
    const record = await this.prisma.healthMessage.findFirst()
    return new GetHealthDto(record?.message ?? 'No health message found on DB.')
  }

  async generateJwtForUser(username: string, password: string): Promise<GetHealthDto> {
    // Dummy implementation for JWT generation
    // In a real application, you would validate the user credentials and generate a JWT
    const token = this.authService.generateJwt(username, password)
    return new GetHealthDto(`Generated Token: ${await token}`)
  }
}

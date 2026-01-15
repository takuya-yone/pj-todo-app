import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'
import { PrismaClient } from '../../generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaTiDBCloud({
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    })

    super({ adapter: adapter })
  }
  async onModuleInit() {
    await this.$connect()
  }
}

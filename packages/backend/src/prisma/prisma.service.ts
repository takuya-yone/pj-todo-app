import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'
import { ENV } from '../../env'
import { PrismaClient } from '../../generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const env = new ENV()

    const _tidbAdapter = new PrismaTiDBCloud({
      host: env.DB_HOST,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
    })

    const _mariaDbAdapter = new PrismaMariaDb({
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      ssl: env.DB_SSLMODE === 'require',
      allowPublicKeyRetrieval: true,
    })

    const pgAdapter = new PrismaPg(
      {
        host: env.DB_HOST,
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        port: env.DB_PORT,
        ssl: env.DB_SSLMODE === 'require',
      },
      { schema: 'public' },
    )

    super({ adapter: pgAdapter })
  }
  async onModuleInit() {
    await this.$connect()
  }
}

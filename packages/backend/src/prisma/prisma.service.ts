import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'
import { PrismaClient } from '../../generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(readonly configService: ConfigService) {
    const _tidbAdapter = new PrismaTiDBCloud({
      host: configService.get('db.host'),
      username: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database'),
    })

    const _mariaDbAdapter = new PrismaMariaDb({
      host: configService.get('db.host'),
      user: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database'),
      ssl: configService.get('db.sslmode') === 'require',
      allowPublicKeyRetrieval: true,
    })

    const pgAdapter = new PrismaPg(
      {
        host: configService.get('db.host'),
        user: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        port: configService.get('db.port'),
        ssl: configService.get('db.sslmode') === 'require',
      },
      { schema: 'public' },
    )

    super({ adapter: pgAdapter })
  }
  async onModuleInit() {
    await this.$connect()
  }
  async onModuleDestroy() {
    await this.$disconnect()
  }
}

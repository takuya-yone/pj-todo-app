import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PrismaClient } from '../../generated/prisma/client'
import { getPgAdapter } from './adapters'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(readonly configService: ConfigService) {
    const pgAdapter = getPgAdapter(configService)
    super({ adapter: pgAdapter })
  }
  async onModuleInit() {
    await this.$connect()
  }
  async onModuleDestroy() {
    await this.$disconnect()
  }
}

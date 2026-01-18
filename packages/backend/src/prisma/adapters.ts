import { ConfigService } from '@nestjs/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

export const getTidbAdapter = (configService: ConfigService) =>
  new PrismaTiDBCloud({
    host: configService.get('db.host'),
    username: configService.get('db.username'),
    password: configService.get('db.password'),
    database: configService.get('db.database'),
  })

export const getMariaDbAdapter = (configService: ConfigService) =>
  new PrismaMariaDb({
    host: configService.get('db.host'),
    user: configService.get('db.username'),
    password: configService.get('db.password'),
    database: configService.get('db.database'),
    ssl: configService.get('db.sslmode') === 'require',
    allowPublicKeyRetrieval: true,
  })

export const getPgAdapter = (configService: ConfigService) =>
  new PrismaPg(
    {
      host: configService.get('db.host'),
      user: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database'),
      port: configService.get('db.port'),
      ssl: configService.get('db.sslmode') === 'require',
    },
    { schema: configService.get('db.schema') },
  )

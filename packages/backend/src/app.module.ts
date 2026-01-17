import { join } from 'node:path'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { HealthController } from './health/health.controller'
import { LoggerMiddleware } from './middleware/logger/logger.middleware'
import { PrismaService } from './prisma/prisma.service'
import { TodoController } from './todo/todo.controller'
import { TodoModule } from './todo/todo.module'
import { TodoService } from './todo/todo.service'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    AuthModule,
    TodoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'frontend/out'),
    }),
  ],
  controllers: [AppController, HealthController, TodoController],
  providers: [TodoService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*splat', method: RequestMethod.ALL })
  }
}

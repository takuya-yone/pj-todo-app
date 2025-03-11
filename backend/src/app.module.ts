import { join } from 'node:path'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './middleware/logger/logger.middleware'
import { PrismaService } from './prisma/prisma.service'
import { TodoController } from './todo/todo.controller'
import { TodoModule } from './todo/todo.module'
import { TodoService } from './todo/todo.service'

@Module({
  imports: [
    TodoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend/out'),
    }),
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*splat', method: RequestMethod.ALL })
  }
}

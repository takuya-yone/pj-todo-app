import { join } from 'node:path'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { HealthModule } from './health/health.module'
import { LoggerMiddleware } from './middleware/logger/logger.middleware'
import { TodoModule } from './todo/todo.module'
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    AuthModule,
    TodoModule,
    HealthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'frontend/out'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*splat', method: RequestMethod.ALL })
  }
}

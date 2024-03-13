import { writeFileSync } from 'node:fs'
import * as path from 'node:path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { dump } from 'js-yaml'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  })
  SwaggerModule.setup('api/docs', app, document)
  const outputPath = path.resolve(process.cwd(), 'openapi.yml')
  writeFileSync(outputPath, dump(document, {}))

  await app.listen(4000)
}
bootstrap()

import * as fs from 'fs'
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

  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  })
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  fs.writeFileSync('./openapi.yml', dump(documentFactory(), {}))
  SwaggerModule.setup('api/docs', app, document)
  // const outputPath = path.resolve(process.cwd(), 'openapi.yml')
  // writeFileSync(outputPath, dump(document, {}))

  await app.listen(4000)
}
bootstrap()

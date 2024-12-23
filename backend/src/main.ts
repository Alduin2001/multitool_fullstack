import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Api Test")
  .addCookieAuth('jwt')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({origin:'http://localhost:3000',credentials:true});
  app.use('/uploads',express.static(join(__dirname,'..','uploads')));
  app.useGlobalPipes();
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();

/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT;
console.log(PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('eccomerce')
    .setDescription('eccomerce api ')
    .addTag('eccomerce')
    .setVersion('1.0')
    .build();
    const documentFactory=SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api',app,documentFactory)
      app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
    // app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT ?? 3000);
}
bootstrap();

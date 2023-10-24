import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule /* , {
    logger: ['error', 'debug', 'warn'],
  } */,
  );
  // all requests will first pass through ValidationPipe
  // No need to specify any ValidationPipe in any Body/method now
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

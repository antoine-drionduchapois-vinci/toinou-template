import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());

  app.use(helmet());

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

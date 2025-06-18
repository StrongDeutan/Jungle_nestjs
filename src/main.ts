// src/main.ts
import { NestFactory }            from '@nestjs/core';
import { ValidationPipe }         from '@nestjs/common';
import { AppModule }              from './app.module';
import { JwtAuthGuard }           from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({ origin: true, credentials: true });

  // 글로벌 파이프: 검증 + 변환
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

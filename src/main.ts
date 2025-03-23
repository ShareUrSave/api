import { AppModule } from '@/app.module';
import { setupSwagger } from '@/swagger';
import { NestFactory } from '@nestjs/core';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}

bootstrap();

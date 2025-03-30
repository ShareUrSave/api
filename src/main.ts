import { setupSwagger } from '@/swagger';
import { AppModule } from '@modules/app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import passport from 'passport';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const redisClient = new Redis(configService.get<string>('REDIS_URL')!);

  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: configService.get<string>('SECRET_KEY')!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: configService.get<string>('NODE_ENV') === 'production',
        signed: true,
        sameSite: 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

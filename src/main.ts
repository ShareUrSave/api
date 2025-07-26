import { LoggingInterceptor } from '@/interceptors/logging.interceptor';
import ValidatorPipe from '@/pipes/validator.pipe';
import { setupSwagger } from '@/swagger';
import { AUTH_COOKIE_NAME } from '@auth/auth.constants';
import { AppModule } from '@modules/app.module';
import { ConfigService } from '@modules/config/config.service';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import passport from 'passport';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidatorPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const configService = app.get(ConfigService);
  const redisClient = new Redis(configService.get('REDIS_URL')!);

  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });

  app.use(
    session({
      name: AUTH_COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
      }),
      secret: configService.get('SECRET_KEY')!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: configService.get('NODE_ENV') === 'production',
        signed: true,
        sameSite: 'lax',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  setupSwagger(app);

  const port = process.env.PORT ?? DEFAULT_PORT;
  if (configService.get('NODE_ENV') === 'production') await app.listen(port);
  else await app.listen(port, '0.0.0.0'); // Allows to connect from other devices on the same network
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

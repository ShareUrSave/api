import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production', '.env.development'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().uri().required(),
        REDIS_URL: Joi.string().uri().default('redis://localhost:6379'),
        SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}

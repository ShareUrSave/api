import { ConfigService } from '@modules/config/config.service';
import configSchema from '@modules/config/schema';
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production', '.env.development'],
      validate: (config) => {
        const result = configSchema.safeParse(config);
        if (!result.success) {
          throw new Error('Invalid configuration');
        }
        return result.data;
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

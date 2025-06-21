import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@modules/config/config.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [ConfigModule, UsersModule, AuthModule],
})
export class AppModule {}

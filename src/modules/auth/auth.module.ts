import { AuthController } from '@modules/auth/auth.controller';
import { SessionSerializer } from '@modules/auth/session.serializer';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, SessionSerializer],
})
export class AuthModule {}

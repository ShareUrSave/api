import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { SessionSerializer } from '@auth/session.serializer';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { SteamStrategy } from '@auth/strategies/steam.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [SessionSerializer, AuthService, LocalStrategy, SteamStrategy],
})
export class AuthModule {}

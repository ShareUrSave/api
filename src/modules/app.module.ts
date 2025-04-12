import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@modules/config/config.module';
import { GamesModule } from '@modules/games/games.module';
import { SavesModule } from '@modules/saves/saves.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [ConfigModule, UsersModule, AuthModule, GamesModule, SavesModule],
})
export class AppModule {}

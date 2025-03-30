import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UsersController } from '@users/users.controller';
import { UsersRepository } from '@users/users.repository';
import { UsersService } from '@users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersRepository, UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}

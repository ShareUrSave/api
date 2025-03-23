import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UsersController } from '@/modules/users/users.controller';
import { UsersRepository } from '@/modules/users/users.repository';
import { UsersService } from '@/modules/users/users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersRepository, UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}

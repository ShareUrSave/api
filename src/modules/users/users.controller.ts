import { UsersService } from '@/modules/users/users.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':identifier')
  getUser(@Param('identifier') identifier: string) {
    return this.usersService.getUser(identifier);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}

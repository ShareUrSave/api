import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '@users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':identifier')
  async getUser(@Param('identifier') identifier: string) {
    return this.usersService.getUser(identifier);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}

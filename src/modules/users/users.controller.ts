import { UsersService } from '@/modules/users/users.service';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':identifier')
  async getUser(
    @Param('identifier') identifier: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.usersService.getUser(identifier);

    return res.status(200).json(user);
  }

  @Get()
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.usersService.getUsers();

    return res.status(200).json(users);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@share-ur-save/common';
import { UsersService } from '@users/users.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser(login, password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user as User;
  }
}

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@users/types';
import { UsersService } from '@users/users.service';
import { UUID } from 'node:crypto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: any, uuid?: UUID) => void): void {
    done(null, user.uuid);
  }

  async deserializeUser(
    uuid: UUID,
    done: (err: any, user: Nullable<User>) => void,
  ): Promise<void> {
    try {
      const user = await this.usersService.getUserByUUID(uuid);

      done(null, user || null);
    } catch (error) {
      done(error, null);
    }
  }
}

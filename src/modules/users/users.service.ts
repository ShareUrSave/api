import { UsersRepository } from '@/modules/users/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User as BaseUser } from '@share-ur-save/common';
import * as bcrypt from 'bcrypt';
import { UUID } from 'node:crypto';

const SALT_ROUNDS = 10;

type User = Omit<BaseUser, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(identifier: string): Promise<User> {
    const users = (
      await Promise.all([
        this.usersRepository.findByUUID(identifier as UUID, {
          includeDeleted: false,
        }),
        this.usersRepository.findByUsername(identifier, {
          includeDeleted: false,
        }),
        this.usersRepository.findByEmail(identifier as Email, {
          includeDeleted: false,
        }),
      ])
    ).filter(Boolean);

    if (!users[0]) throw new NotFoundException('User not found');

    return users[0];
  }

  async getUserByUUID(uuid: UUID): Promise<User> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData;
  }

  async getUserByEmail(email: Email): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData;
  }

  async getUsers(): Promise<User[]> {
    return (await this.usersRepository.findAll()).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password: _, ...user }) => user,
    );
  }

  async createUser(
    params: Omit<BaseUser, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    const hashedPassword = params.password
      ? await bcrypt.hash(params.password, SALT_ROUNDS)
      : null;

    const user = await this.usersRepository.create({
      ...params,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData;
  }

  async deleteUser(uuid: UUID): Promise<void> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete(uuid);
  }
}

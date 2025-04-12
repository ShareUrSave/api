import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseUser, User } from '@users/types';
import { UsersRepository } from '@users/users.repository';
import bcrypt from 'bcrypt';
import { UUID } from 'node:crypto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validateUser(login: string, password: string): Promise<Nullable<User>> {
    const user = (
      await Promise.all([
        this.usersRepository.findByUsername(login),
        this.usersRepository.findByEmail(login as Email),
      ])
    ).filter(Boolean)[0];

    if (!user || !user.password || !bcrypt.compareSync(password, user.password))
      return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getUser(identifier: string): Promise<User> {
    const user = (
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
    ).filter(Boolean)[0];

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getUserByUUID(uuid: UUID): Promise<User> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getUserByEmail(email: Email): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getUsers(): Promise<User[]> {
    return (await this.usersRepository.findAll()).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password: _, ...user }) => user as User,
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

    return userData as User;
  }

  async deleteUser(uuid: UUID): Promise<void> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete(uuid);
  }
}

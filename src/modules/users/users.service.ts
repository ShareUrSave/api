import { UsersRepository } from '@/modules/users/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@share-ur-save/common';
import * as bcrypt from 'bcrypt';
import { UUID } from 'node:crypto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(
    identifier: string,
    includeDeleted: boolean = false,
  ): Promise<User> {
    const user = (
      await Promise.all([
        this.usersRepository.findByUUID(identifier as UUID, includeDeleted),
        this.usersRepository.findByUsername(identifier, includeDeleted),
        this.usersRepository.findByEmail(identifier as Email, includeDeleted),
      ])
    ).filter(Boolean);

    if (!user[0]) throw new NotFoundException('User not found');

    return user[0];
  }

  async getUserByUUID(uuid: UUID): Promise<User> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUserByEmail(email: Email): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async createUser(
    params: Omit<User, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    const hashedPassword = params.password
      ? await bcrypt.hash(params.password, SALT_ROUNDS)
      : null;

    return this.usersRepository.create({ ...params, password: hashedPassword });
  }

  async deleteUser(uuid: UUID): Promise<void> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete(uuid);
  }
}

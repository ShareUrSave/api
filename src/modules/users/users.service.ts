import { PaginatedResult } from '@api-types/pagination';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseUser, User } from '@users/types';
import { BANNED_USERNAMES } from '@users/users.constants';
import { GetUsersQueryDto } from '@users/users.dtos';
import { UsersRepository } from '@users/users.repository';
import bcrypt from 'bcrypt';
import { Request } from 'express';

const SALT_ROUNDS = 10;
const MAX_USERS_PER_PAGE = 1000;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validateUser(login: string, password: string): Promise<Nullable<User>> {
    const user = (
      await Promise.all([
        this.usersRepository.findByUsername(login),
        this.usersRepository.findByEmail(login),
      ])
    ).filter(Boolean)[0];

    if (!user || !user.password || !bcrypt.compareSync(password, user.password))
      return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getUserByUUID(uuid: string): Promise<User> {
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

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return userData as User;
  }

  async getMe(request: Request): Promise<User> {
    const user = request.user ? this.getUserByUUID(request.user.uuid) : null;

    if (!user) throw new UnauthorizedException('You are not authenticated');

    return user;
  }

  async getUsers(
    query: GetUsersQueryDto,
  ): Promise<PaginatedResult<User, 'users'>> {
    const limit = Math.min(
      query.limit ?? MAX_USERS_PER_PAGE,
      MAX_USERS_PER_PAGE,
    );
    const offset = query.page ? (query.page - 1) * limit : 0;

    const [users, count] = await Promise.all([
      this.usersRepository.findAll({
        limit,
        offset,
      }),
      this.usersRepository.count(),
    ]);

    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      users: users.map(({ password: _, ...user }) => user as User),
      pagination: {
        page: 1,
        limit: MAX_USERS_PER_PAGE,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async createUser(
    params: Omit<BaseUser, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    if (BANNED_USERNAMES.includes(params.username))
      throw new BadRequestException(
        `Username "${params.username}" is not allowed`,
      );

    const existingUser = await Promise.all([
      this.usersRepository.findByUsername(params.username),
      this.usersRepository.findByEmail(params.email),
    ]);

    if (existingUser[0])
      throw new ConflictException(
        `Username ${params.username} is already in use`,
      );
    if (existingUser[1])
      throw new ConflictException(`Email ${params.email} is already in use`);

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

  async deleteUser(uuid: string): Promise<void> {
    const user = await this.usersRepository.findByUUID(uuid);

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete(uuid);
  }
}

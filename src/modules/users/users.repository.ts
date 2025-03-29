import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@share-ur-save/common';
import { UUID } from 'node:crypto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUUID(
    uuid: UUID,
    options: { includeDeleted?: boolean } = {},
  ): Promise<Nullable<User>> {
    return this.prismaService.user.findUnique({
      where: {
        uuid,
      },
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted: options.includeDeleted,
    });
  }

  async findByUsername(
    username: string,
    options: { includeDeleted?: boolean } = {},
  ): Promise<Nullable<User>> {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted: options.includeDeleted,
    });
  }

  async findByEmail(
    email: Email,
    options: { includeDeleted?: boolean } = {},
  ): Promise<Nullable<User>> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted: options.includeDeleted,
    });
  }

  async findAll(options: { includeDeleted?: boolean } = {}): Promise<User[]> {
    return this.prismaService.user.findMany({
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted: options.includeDeleted,
    });
  }

  async create(
    data: Omit<User, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async delete(
    uuid: UUID,
    options: { hardDelete?: boolean } = {},
  ): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        uuid,
      },
      // @ts-expect-error hardDelete is a custom argument
      hardDelete: options.hardDelete,
    });
  }
}

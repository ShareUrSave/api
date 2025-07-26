import { FindOptions, IRepository } from '@api-types/repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@share-ur-save/common';

@Injectable()
export class UsersRepository implements IRepository<User> {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUUID(
    uuid: string,
    options: FindOptions<false> = {},
  ): Promise<Nullable<User>> {
    const { includeDeleted = false } = options;

    return this.prismaService.user.findUnique({
      where: {
        uuid,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
    });
  }

  async findByUsername(
    username: string,
    options: FindOptions<false> = {},
  ): Promise<Nullable<User>> {
    const { includeDeleted = false } = options;

    return this.prismaService.user.findUnique({
      where: {
        username,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
    });
  }

  async findByEmail(
    email: string,
    options: FindOptions<false> = {},
  ): Promise<Nullable<User>> {
    const { includeDeleted = false } = options;

    return this.prismaService.user.findUnique({
      where: {
        email,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
    });
  }

  async findAll(options: FindOptions<true> = {}): Promise<User[]> {
    const { includeDeleted = false, offset, limit } = options;

    return this.prismaService.user.findMany({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      skip: offset,
      take: limit,
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
    uuid: string,
    options: { hardDelete?: boolean } = {},
  ): Promise<void> {
    const { hardDelete = false } = options;

    if (hardDelete) await this.hardDelete(uuid);
    else
      await this.prismaService.user.update({
        where: {
          uuid,
        },
        data: {
          deletedAt: new Date(),
        },
      });
  }

  private async hardDelete(uuid: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        uuid,
      },
    });
  }

  async count(options: FindOptions<false> = {}): Promise<number> {
    const { includeDeleted = false } = options;

    return this.prismaService.user.count({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
    });
  }
}

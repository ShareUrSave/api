import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@share-ur-save/common';
import { UUID } from 'node:crypto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUUID(
    uuid: UUID,
    includeDeleted: boolean = false,
  ): Promise<Nullable<User>> {
    return this.prismaService.user.findUnique({
      where: {
        uuid,
      },
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted,
    });
  }

  async findByUsername(
    username: string,
    includeDeleted: boolean = false,
  ): Promise<Nullable<User>> {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted,
    });
  }

  async findByEmail(
    email: Email,
    includeDeleted: boolean = false,
  ): Promise<Nullable<User>> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted,
    });
  }

  async findAll(includeDeleted: boolean = false): Promise<User[]> {
    return this.prismaService.user.findMany({
      // @ts-expect-error includeDeleted is a custom argument
      includeDeleted,
    });
  }

  async create(
    data: Omit<User, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async delete(uuid: UUID, softDelete: boolean = true): Promise<void> {
    if (softDelete)
      await this.prismaService.user.update({
        where: {
          uuid,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    else
      await this.prismaService.user.delete({
        where: {
          uuid,
        },
      });
  }
}

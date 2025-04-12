import { User as PrismaUser } from '@share-ur-save/common';
import { UUID } from 'node:crypto';

export type BaseUser = PrismaUser & { uuid: UUID };

export type User = Omit<BaseUser, 'password'>;

import { User as PrismaUser } from '@share-ur-save/common';

export type BaseUser = PrismaUser;

export type User = Omit<BaseUser, 'password'>;

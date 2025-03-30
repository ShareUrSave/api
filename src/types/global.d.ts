import { User } from '@users/types';

declare global {
  declare type Nullable<T> = T | null;

  declare type Email = `${string}@${string}.${string}`;
}

declare module 'express' {
  interface Request {
    user: Nullable<User>;
  }
}

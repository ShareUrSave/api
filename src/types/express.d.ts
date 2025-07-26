import { User } from '@users/types';

declare module 'express' {
  interface Request {
    user: Nullable<User>;
  }
}

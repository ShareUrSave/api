export type FindOptions<
  withPagination extends boolean = false,
  Extra extends object = object,
> = { includeDeleted?: boolean } & (withPagination extends true
  ? { offset?: number; limit?: number }
  : object) &
  Extra;

export interface IRepository<T> {
  findByUUID(uuid: string, options?: FindOptions<false>): Promise<Nullable<T>>;
  findAll(options?: FindOptions<true>): Promise<T[]>;
  create: (
    data: Omit<T, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ) => Promise<T>;
  delete(uuid: string, options?: { hardDelete?: boolean }): Promise<void>;
  count: (options?: FindOptions<false>) => Promise<number>;
}

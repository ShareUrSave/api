import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@share-ur-save/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ log: ['warn', 'error'] });
  }
}

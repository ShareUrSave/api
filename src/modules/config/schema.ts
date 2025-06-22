import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  SECRET_KEY: z.string(),
});

export default configSchema;

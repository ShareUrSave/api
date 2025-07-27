import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  ELASTICSEARCH_HOSTS: z.string().url().default('http://localhost:9200'),

  STEAM_API_KEY: z.string(),
  STEAM_RETURN_URL: z.string().url(),
  STEAM_REALM: z.string().url(),

  SECRET_KEY: z.string(),
});

export default configSchema;

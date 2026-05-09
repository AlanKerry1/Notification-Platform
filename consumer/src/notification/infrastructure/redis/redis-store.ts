import { Inject } from '@nestjs/common';
import { IIdempotencyStore } from '../../domain/idempotency-store';
import Redis from 'ioredis';

export class RedisStore implements IIdempotencyStore {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  async exists(id: string): Promise<boolean> {
    return !!(await this.redis.get(id));
  }

  async save(id: string): Promise<void> {
    await this.redis.set(id, '1', 'EX', 86400);
  }
}

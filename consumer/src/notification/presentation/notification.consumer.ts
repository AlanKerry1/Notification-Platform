import { Controller, Inject, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendNotificationUseCase } from '../application/send-notification.use-case';
import { NotificationTransportDto } from './dto/notification-transport.dto';
import Redis from 'ioredis';

@Controller()
export class NotificationConsumer {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  @EventPattern('notification.created')
  async handleNotification(
    @Payload() notification: NotificationTransportDto,
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    try {
      await this.sendNotificationUseCase.execute(notification);
      
      channel.ack(msg);
    } catch (e) {
      const retryCount = Number(await this.redis.get(`retry:${notification.id}`)) ?? 0;

      if (retryCount < 3) {
        await this.redis.set(`retry:${notification.id}`, retryCount+1, "EX", 86400);

        await channel.nack(msg, false, true);
      }

      return;
    }
  }
}

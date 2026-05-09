import { Controller, Inject, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendNotificationUseCase } from '../application/send-notification.use-case';
import { NotificationTransportDto } from './dto/notification-transport.dto';
import Redis from 'ioredis';
import { resolve } from 'path';

@Controller()
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

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
      this.logger.log(`Processing notification ${notification.id}`);

      await this.sendNotificationUseCase.execute(notification);

      this.logger.log(`Notification ${notification.id} processed`);

      channel.ack(msg);
    } catch (e) {
      const retryCount =
        Number(await this.redis.get(`retry:${notification.id}`)) ?? 0;

      if (retryCount < 3) {
        this.logger.error(`Notification failed, retry № ${retryCount + 1}`);

        await this.redis.set(
          `retry:${notification.id}`,
          retryCount + 1,
          'EX',
          86400,
        );

        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });

        await channel.nack(msg, false, true);
        return;
      }

      if (e instanceof Error) {
        this.logger.error(`Notification failed`, e.stack);
      }

      await channel.nack(msg, false, false);
      return;
    }
  }
}

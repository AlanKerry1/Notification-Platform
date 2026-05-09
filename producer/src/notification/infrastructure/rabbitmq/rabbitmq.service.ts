import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationEvent } from '../../domain/notification-event.entity';
import { INotificationQueue } from '../../domain/notification-queue';
import { lastValueFrom, retry, timer } from 'rxjs';

@Injectable()
export class RabbitmqNotificationQueue implements INotificationQueue {
  constructor(
    @Inject('NOTIFICATION_RMQ') private readonly client: ClientProxy,
  ) {}

  async publish(notificationEvent: NotificationEvent): Promise<void> {
    const source$ = this.client
      .emit(NotificationEvent.eventName, notificationEvent)
      .pipe(
        retry({
          count: 3,
          delay: (error, retryCount) => {
            console.log(`Попытка #${retryCount + 1} через 3 сек...`);
            return timer(3000);
          },
        }),
      );

    try {
      await lastValueFrom(source$);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to publish notification event',
      );
    }
  }
}

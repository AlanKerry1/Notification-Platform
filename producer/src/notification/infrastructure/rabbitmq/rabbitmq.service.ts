import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationEvent } from '../../domain/notification-event.entity';
import { INotificationQueue } from '../../domain/notification.queue';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitmqNotificationQueue implements INotificationQueue {
  constructor(
    @Inject('NOTIFICATION_RMQ') private readonly client: ClientProxy,
  ) {}

  async publish(notificationEvent: NotificationEvent): Promise<void> {
    await this.client.emit(NotificationEvent.eventName, notificationEvent);
  }
}

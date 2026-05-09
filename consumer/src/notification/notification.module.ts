import { Module } from '@nestjs/common';
import { NotificationConsumer } from './presentation/notification.consumer';
import { SendNotificationUseCase } from './application/send-notification.use-case';
import { INOTIFICATION_SENDER, INotificationSender } from './domain/notification-sender';
import { Notification } from './domain/notification.entity';

class tempSender implements INotificationSender {
    async send(notification: Notification): Promise<void> {
        return new Promise(() => {});
    }
}

@Module({
  imports: [],
  controllers: [NotificationConsumer],
  providers: [SendNotificationUseCase, 
    {
      provide: INOTIFICATION_SENDER,
      useClass: tempSender
    },
  ],
})
export class NotificationModule {}

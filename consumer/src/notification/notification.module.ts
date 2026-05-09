import { Module } from '@nestjs/common';
import { NotificationConsumer } from './presentation/notification.consumer';
import { SendNotificationUseCase } from './application/send-notification.use-case';
import { INOTIFICATION_SENDER } from './domain/notification-sender';
import { TelegramNotificationSender } from './infrastructure/telegram/telegram-notification-sender';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: 'your-bot-token',
    }),
  ],
  controllers: [NotificationConsumer],
  providers: [
    SendNotificationUseCase,
    {
      provide: INOTIFICATION_SENDER,
      useClass: TelegramNotificationSender,
    },
  ],
})
export class NotificationModule {}
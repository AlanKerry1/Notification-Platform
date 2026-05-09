import { Module } from '@nestjs/common';
import { NotificationConsumer } from './presentation/notification.consumer';
import { SendNotificationUseCase } from './application/send-notification.use-case';
import { NOTIFICATION_SENDER } from './domain/notification-sender';
import { TelegramNotificationSender } from './infrastructure/telegram/telegram-notification-sender';
import { TelegrafModule } from 'nestjs-telegraf';
import Redis from 'ioredis';
import { IDEMPOTENCY_STORE } from './domain/idempotency-store';
import { RedisStore } from './infrastructure/redis/redis-store';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: String(process.env.TELEGRAM_BOT_TOKEN),
    }),
  ],
  controllers: [NotificationConsumer],
  providers: [
    SendNotificationUseCase,
    {
      provide: NOTIFICATION_SENDER,
      useClass: TelegramNotificationSender,
    },
    {
        provide: IDEMPOTENCY_STORE,
        useClass: RedisStore
    },
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: String(process.env.REDIS_HOST),
          port: Number(process.env.REDIS_PORT),
        });
      },
    },
  ],
})
export class NotificationModule {}
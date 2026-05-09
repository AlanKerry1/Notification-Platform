import { InjectBot } from 'nestjs-telegraf';
import { INotificationSender } from '../../domain/notification-sender';
import { Notification } from '../../domain/notification.entity';
import { Telegraf } from 'telegraf';

export class TelegramNotificationSender implements INotificationSender {
  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

  async send(notification: Notification): Promise<void> {
    await this.bot.telegram.sendMessage(notification.chatId, notification.message);
  }
}

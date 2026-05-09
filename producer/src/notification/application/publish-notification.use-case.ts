import { Inject, Injectable } from "@nestjs/common";
import { INotificationQueue } from "../domain/notification.queue";
import { NotificationEvent } from "../domain/notification-event.entity";

@Injectable()
export class PublishNotificationUseCase {
  constructor(
    @Inject("INotificationQueue") private readonly queue: INotificationQueue,
  ) {}

  async execute(dto: { chatId: string; message: string }) {
    const event = new NotificationEvent(
      crypto.randomUUID(),
      dto.chatId,
      dto.message,
    );

    await this.queue.publish(event);
  }
}
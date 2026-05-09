import { Inject, Injectable } from "@nestjs/common";
import { INotificationQueue } from "../domain/notification.queue";
import { NotificationEvent } from "../domain/notification-event.entity";
import { NotificationEventDto } from "./dto/notification-event.dto";

@Injectable()
export class PublishNotificationUseCase {
  constructor(
    @Inject("INotificationQueue") private readonly queue: INotificationQueue,
  ) {}

  async execute(notificationEventDto: NotificationEventDto) {
    const event = new NotificationEvent(
      crypto.randomUUID(),
      notificationEventDto.chatId,
      notificationEventDto.message,
    );

    await this.queue.publish(event);
  }
}
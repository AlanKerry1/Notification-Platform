import { Inject, Injectable } from "@nestjs/common";
import { NotificationDto } from "./dto/notification.dto";
import { INotificationSender, NOTIFICATION_SENDER } from "../domain/notification-sender";

@Injectable()
export class SendNotificationUseCase {
    constructor(
        @Inject(NOTIFICATION_SENDER) private readonly notificationSender: INotificationSender
    ) {}

    async execute(notificationDto: NotificationDto) {
        //проверка по id с помощью redis

        await this.notificationSender.send(notificationDto);
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { NotificationDto } from "./dto/notification.dto";
import { INotificationSender, INOTIFICATION_SENDER } from "../domain/notification-sender";

@Injectable()
export class SendNotificationUseCase {
    constructor(
        @Inject(INOTIFICATION_SENDER) private readonly notificationSender: INotificationSender
    ) {}

    async execute(notificationDto: NotificationDto) {
        //проверка по id с помощью redis

        await this.notificationSender.send(notificationDto);
    }
}
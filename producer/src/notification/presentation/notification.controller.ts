import { Body, Controller, Post } from "@nestjs/common";
import { NotificationEventDtoHttp } from "./dto/notification-event-http.dto";
import { PublishNotificationUseCase } from "../application/publish-notification.use-case";

@Controller()
export class NotificationController {
    constructor(
        private readonly publishNotificationUseCase: PublishNotificationUseCase
    ) {}

    @Post("notification")
    async publishNotification(@Body() notificationEventDto: NotificationEventDtoHttp) {
        try {
            await this.publishNotificationUseCase.execute(notificationEventDto);
        } catch (e) {
            console.log(e);
        }
    }
}
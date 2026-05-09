import { Body, Controller, Post, Res } from "@nestjs/common";
import { NotificationEventDtoHttp } from "./dto/notification-event-http.dto";
import { PublishNotificationUseCase } from "../application/publish-notification.use-case";
import { Response } from "express";

@Controller("notifications")
export class NotificationController {
    constructor(
        private readonly publishNotificationUseCase: PublishNotificationUseCase
    ) {}

    @Post()
    async publishNotification(@Body() notificationEventDto: NotificationEventDtoHttp, @Res() res: Response) {
        try {
            await this.publishNotificationUseCase.execute(notificationEventDto);
            res.json({message: "Сообщение отправлено"})
        } catch (e) {
            console.log(e);
            return res.status(500).send();
        }
    }
}
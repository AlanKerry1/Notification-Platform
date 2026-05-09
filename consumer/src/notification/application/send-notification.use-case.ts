import { Inject, Injectable } from "@nestjs/common";
import { NotificationDto } from "./dto/notification.dto";
import { INotificationSender, NOTIFICATION_SENDER } from "../domain/notification-sender";
import { IDEMPOTENCY_STORE, IIdempotencyStore } from "../domain/idempotency-store";

@Injectable()
export class SendNotificationUseCase {
    constructor(
        @Inject(NOTIFICATION_SENDER) private readonly notificationSender: INotificationSender,
        @Inject(IDEMPOTENCY_STORE) private readonly idempotencyStore: IIdempotencyStore
    ) {}

    async execute(notificationDto: NotificationDto) {
        if (await this.idempotencyStore.exists(notificationDto.id)) {
            return
        }

        await this.idempotencyStore.save(notificationDto.id);
        await this.notificationSender.send(notificationDto);
    }
}
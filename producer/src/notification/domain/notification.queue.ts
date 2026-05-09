import { NotificationEvent } from "./notification-event.entity";

export interface INutificationQueue {
    publish(notificationEvent: NotificationEvent): Promise<void>;
}
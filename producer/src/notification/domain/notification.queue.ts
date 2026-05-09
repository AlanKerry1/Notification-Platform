import { NotificationEvent } from "./notification-event.entity";

export interface INotificationQueue {
    publish(notificationEvent: NotificationEvent): Promise<void>;
}
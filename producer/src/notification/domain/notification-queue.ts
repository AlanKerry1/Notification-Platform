import { NotificationEvent } from "./notification-event.entity";

export interface INotificationQueue {
    publish(notificationEvent: NotificationEvent): Promise<void>;
}

export const NOTIFICATION_QUEUE = Symbol('NOTIFICATION_QUEUE');
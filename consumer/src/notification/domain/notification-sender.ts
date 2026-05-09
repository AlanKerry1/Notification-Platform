import { Notification } from "./notification.entity";

export interface INotificationSender {
    send(notification: Notification): Promise<void>;
}

export const NOTIFICATION_SENDER = Symbol("NOTIFICATION_SENDER");
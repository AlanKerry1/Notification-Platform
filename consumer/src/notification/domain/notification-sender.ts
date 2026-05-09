import { Notification } from "./notification.entity";

export interface INotificationSender {
    send(notification: Notification): Promise<void>;
}

export const INOTIFICATION_SENDER = Symbol("INOTIFICATION_SENDER");
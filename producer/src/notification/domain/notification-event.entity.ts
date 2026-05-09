export class NotificationEvent {
    static readonly eventName = 'notification.created';

    constructor(
        public readonly id: string,
        public readonly chatId: string,
        public readonly message: string
    ) {}
}
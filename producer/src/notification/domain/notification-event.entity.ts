export class NotificationEvent {
    constructor(
        public readonly id: string,
        public readonly chatId: string,
        public readonly message: string
    ) {}
}
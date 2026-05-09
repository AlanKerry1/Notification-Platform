export class NotificationEventDto {
    constructor(
        public readonly chatId: string,
        public readonly message: string,
    ) {}
}
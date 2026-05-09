export class NotificationDto {
    constructor(
        public readonly id: string,
        public readonly chatId: string,
        public readonly message: string,
    ) {}
}
export class NotificationEventDtoHttp {
    constructor(
        public readonly chatId: string,
        public readonly message: string,
    ) {}
}
import { IsNotEmpty, IsString } from "class-validator";

export class NotificationEventDtoHttp {
    constructor(chatId: string, message: string) {
        this.chatId = chatId;
        this.message = message;
    }

    @IsString()
    @IsNotEmpty()
    chatId: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}

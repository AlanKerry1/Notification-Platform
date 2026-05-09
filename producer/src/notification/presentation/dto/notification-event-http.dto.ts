import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class NotificationEventDtoHttp {
    constructor(chatId: string, message: string) {
        this.chatId = chatId;
        this.message = message;
    }

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    chatId: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string;
}

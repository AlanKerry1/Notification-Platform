import { Body, Controller, Post, Res } from '@nestjs/common';
import { NotificationEventDtoHttp } from './dto/notification-event-http.dto';
import { PublishNotificationUseCase } from '../application/publish-notification.use-case';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly publishNotificationUseCase: PublishNotificationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send notification' })
  @ApiResponse({ status: 200, description: 'Message sent' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async publishNotification(
    @Body() notificationEventDto: NotificationEventDtoHttp,
  ) {
    await this.publishNotificationUseCase.execute(notificationEventDto);
    return { message: 'Message sent' };
  }
}

import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SendNotificationUseCase } from '../application/send-notification.use-case';
import { NotificationTransportDto } from './dto/notification-transport.dto';

@Controller()
export class NotificationConsumer {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  @EventPattern('notification.created')
  async handleNotification(
    @Payload() notification: NotificationTransportDto,
    @Ctx() context: RmqContext,
  ) {
    console.log(notification);
  }
}
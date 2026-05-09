import { Module } from '@nestjs/common';
// import { RabbitmqModule } from './infrastructure/rabbitmq/rabbitmq.module';
import { INOTIFICATION_QUEUE } from './domain/notification.queue';
import { RabbitmqNotificationQueue } from './infrastructure/rabbitmq/rabbitmq.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './presentation/notification.controller';
import { PublishNotificationUseCase } from './application/publish-notification.use-case';

console.log(process.env.RMQ_CONNECTION_STRING);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: [String(process.env.RMQ_CONNECTION_STRING)],
          queue: process.env.RMQ_QUEUE_NAME,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    PublishNotificationUseCase,
    {
      provide: INOTIFICATION_QUEUE,
      useFactory: (client: ClientProxy) => {
        return new RabbitmqNotificationQueue(client);
      },
      inject: ['NOTIFICATION_RMQ'],
    },
  ],
})
export class NotificationModule {}

import { PublishNotificationUseCase } from "../src/notification/application/publish-notification.use-case";

describe('SendNotificationUseCase', () => {
  let useCase: PublishNotificationUseCase;

  const queueMock = {
    publish: jest.fn(),
  };

  beforeEach(() => {
    useCase = new PublishNotificationUseCase(queueMock as any);
  });

  it('should publish notification event', async () => {
    await useCase.execute({
      chatId: '1',
      message: 'hello',
    });

    expect(queueMock.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        chatId: '1',
      }),
    );
  });
});
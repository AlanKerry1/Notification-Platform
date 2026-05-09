import { NotificationEvent } from "../src/notification/domain/notification-event.entity";

describe("Notification event entity", () => {
  it("should create valid entity", () => {
    const n = new NotificationEvent("id", "chatId", "hello");

    expect(n.message).toBe("hello");
    expect(n.id).toBe("id");
  });
});
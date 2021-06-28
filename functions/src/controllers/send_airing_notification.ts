import { admin, fcm } from "../config/firebase";
import { NotificationModel } from "../models/notification_model";

export class SendAiringNotification {
  async processNotification(notification: NotificationModel): Promise<any> {
    console.log(notification.results);
    notification.results?.forEach((element) => {
      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: "New Episode!",
          body: `A new episode of ${element.name!} is showing today`,
          click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
      };

      return fcm.sendToDevice(element.fcm!, payload);
    });
  }
}

import { admin, fcm } from "../config/firebase";
import { NotificationModel } from "../models/notification_model";

export class SendAiringNotification {
  /**
   * send notification to users that have episodes showing today
   * @param notification
   */
  async processNotification(notification: NotificationModel): Promise<any> {
    notification.results?.forEach((element) => {
      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: "New Episode!",
          body: `A new episode of ${element.name!} is airing today`,
        },
        data: {
          title: "New Episode!",
          body: `A new episode of ${element.name!} is airing today`,
          click_action: "FLUTTER_NOTIFICATION_CLICK",
          status: "new-episode",
        },
      };

      return fcm.sendToDevice(element.fcm!, payload);
    });
  }
}

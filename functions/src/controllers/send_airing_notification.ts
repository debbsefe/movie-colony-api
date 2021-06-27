import { EventContext } from "firebase-functions";
import { admin, fcm } from "../config/firebase";
import { AbstractMethods } from "../interfaces/abstract_methods";
import { NotificationModel } from "../models/notification_model";

export class SendAiringNotification extends AbstractMethods {
  async onCreate(
    snap: FirebaseFirestore.DocumentSnapshot,
    context: EventContext
  ): Promise<any> {
    const notification = snap as NotificationModel;
    if (notification === null || notification === undefined) {
      console.log("Console log");
      return;
    }
    await this.processNotification(notification);
    console.log("All Done!");
  }

  async processNotification(notification: NotificationModel): Promise<any> {
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

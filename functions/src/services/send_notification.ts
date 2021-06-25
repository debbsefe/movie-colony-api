import { AbstractMethods } from "../interfaces/abstract_methods";
import { EventContext } from "firebase-functions";
import { NotificationMapper } from "../mapper/notification_mapper";
import { NotificationDB } from "../database/notification_database";
import { Notification } from "../models/notification_model";

export class SendNotification extends AbstractMethods {
  private db = new NotificationDB();

  async onCreate(
    snap: FirebaseFirestore.DocumentSnapshot,
    context: EventContext
  ): Promise<any> {
    const notificationMapper = new NotificationMapper();
    const notification = notificationMapper.fromSnapshot(snap);
    if (notification === null || notification === undefined) {
      console.log("Console log");
      return;
    }
    await this.db.add(notification);
    console.log("All Done!");
  }

  async processNotification(notification: Notification): Promise<any> {
    //const tokens = notification.map((snap) => snap.id);
  }
}

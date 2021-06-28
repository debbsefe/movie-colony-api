import { NotificationModel } from "../models/notification_model";
import { Strings } from "../utils/strings";
import { db } from "../config/firebase";
import { notificationConverter } from "../converters/notification_converter";

export class NotificationDB {
  async add(notification: NotificationModel): Promise<void> {
    const docRef = db
      .collection(Strings.NOTIFICATION_COL_REF)
      .withConverter(notificationConverter)
      .doc();

    await docRef.set(notification);
  }
}

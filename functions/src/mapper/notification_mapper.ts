import { IMapper } from "../interfaces/mapper";
import { Notification } from "../models/notification_model";

export class NotificationMapper implements IMapper<Notification> {
  fromSnapshot(
    snapshot: FirebaseFirestore.DocumentSnapshot
  ): Notification | undefined {
    if (snapshot === null || snapshot === undefined) return undefined;
    const data = snapshot.data();
    if (data === null || data === undefined) return undefined;

    return new Notification({
      ref: snapshot.ref,
      notification: data[Notification.NOTIFICATION_FIELD],
      tvId: data[Notification.TV_ID],
      tvName: data[Notification.TV_NAME],
      fcm: data[Notification.FCM],
    });
  }

  toMap(item: Notification): FirebaseFirestore.DocumentData {
    return {
      [Notification.NOTIFICATION_FIELD]: item.notification,
      [Notification.TV_ID]: item.tvId,
      [Notification.TV_NAME]: item.tvName,
      [Notification.FCM]: item.fcm,
    };
  }
}

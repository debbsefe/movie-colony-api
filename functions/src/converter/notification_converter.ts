import { NotificationModel } from "../models/notification_model";

export const notificationConverter = {
  toFirestore(notification: NotificationModel): FirebaseFirestore.DocumentData {
    return {
      result: notification.results,
    };
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot
  ): NotificationModel {
    const data = snapshot.data();
    return { results: data.results };
  },
};

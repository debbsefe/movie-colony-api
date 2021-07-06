import { NotificationModel } from "../models/notification_model";

/**
 * convert data to and from firestore
 */
export const notificationConverter = {
  /**
   * convert notification model to firebase document data
   * @param NotificationModel
   *  @return FirebaseFirestore.DocumentData
   */
  toFirestore(notification: NotificationModel): FirebaseFirestore.DocumentData {
    return {
      results: notification.results,
    };
  },

  /**
   * convert firebase document data to notification model
   * @param FirebaseFirestore.QueryDocumentSnapshot
   *  @return NotificationModel
   */
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot
  ): NotificationModel {
    const data = snapshot.data();
    return { results: data.results };
  },
};

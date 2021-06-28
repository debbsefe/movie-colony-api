import { Results } from "../models/notification_model";

export const resultsConverter = {
  toFirestore(notification: Results): FirebaseFirestore.DocumentData {
    return {
      id: notification.id,
      name: notification.name,
      fcm: notification.fcm,
    };
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Results {
    const data = snapshot.data();
    return { id: data.id, name: data.name, fcm: data.fcm };
  },
};

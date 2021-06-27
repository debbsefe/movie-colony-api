import { Strings } from "../utils/strings";
import { db } from "../config/firebase";
import { Results, NotificationModel } from "../models/notification_model";
import { resultsConverter } from "../converter/results_converter";
import { notificationConverter } from "../converter/notification_converter";

export class ResultsDB {
  async getNotificationList(): Promise<Results[] | undefined> {
    const snap = await db
      .collection(Strings.NOTIFICATION_LIST_COL_REF)
      .withConverter(resultsConverter)
      .get();

    const result = snap.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    return result;
  }

  async add(results: Results[]): Promise<void> {
    const model = new NotificationModel(results);
    const docRef = db
      .collection(Strings.NOTIFICATION_COL_REF)
      .withConverter(notificationConverter)
      .doc();

    await docRef.set(model);
  }
}

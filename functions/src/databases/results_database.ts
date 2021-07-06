import { Strings } from "../utils/strings";
import { db } from "../config/firebase";
import { Results, NotificationModel } from "../models/notification_model";
import { resultsConverter } from "../converters/results_converter";
import { notificationConverter } from "../converters/notification_converter";

export class ResultsDB {
  /**
   * fetch data from tv collectionGroup in cloud firestore
   * @return Results[]
   */
  async get(): Promise<Results[] | undefined> {
    const snap = await db
      .collectionGroup("tv")
      .withConverter(resultsConverter)
      .get();

    const result = snap.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    return result;
  }

  /**
   * add document data to notification collection in cloud firestore
   * @param results
   * @return void
   */
  async add(results: Results[]): Promise<void> {
    const model = new NotificationModel(results);
    const docRef = db
      .collection(Strings.NOTIFICATION_COL_REF)
      .withConverter(notificationConverter)
      .doc();

    await docRef.set(model);
  }
}

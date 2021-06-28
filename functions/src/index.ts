import functions = require("firebase-functions");
// import { SaveNotification } from "./controllers/save_notification";
import { SendAiringNotification } from "./controllers/send_airing_notification";
import { ResultsDB } from "./databases/results_database";
import { NotificationModel } from "./models/notification_model";
import { FetchAiring } from "./services/fetch_airing";
import { FetchNotificationList } from "./services/fetch_notification_list";
import { Strings } from "./utils/strings";

export const sendAiringNotification = functions.firestore
  .document(`${Strings.NOTIFICATION_COL_REF}/{notificationId}`)
  .onCreate(async (snap, context) => {
    const notification = snap.data() as NotificationModel;
    const sendAiringNotification = new SendAiringNotification();

    if (notification === null || notification === undefined) {
      console.log(`${notification} notification `);
      return;
    }
    await sendAiringNotification.processNotification(notification);
  });

export const saveNotification = functions.https.onRequest(async (req, res) => {
  const fetchAiring = new FetchAiring();
  const resultDb = new ResultsDB();
  const notification = new FetchNotificationList();

  const airing = await fetchAiring.airing();
  const notificationList = await notification.fetchList();
  const filteredArray = notificationList!.filter((o) =>
    airing!.some(({ id }) => o.id === id)
  );

  await resultDb.add(filteredArray!);
  res.send(filteredArray);
});

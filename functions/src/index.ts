import functions = require("firebase-functions");
import { SendAiringNotification } from "./controllers/send_airing_notification";
import { ResultsDB } from "./databases/results_database";
import { NotificationModel } from "./models/notification_model";
import { FetchTvAiring } from "./services/fetch_tv_airing";
import { FetchTvNotificationList } from "./services/fetch_tv_notification_list";
import { Strings } from "./utils/strings";

/**
 * send notification to users that have an episode showing
 */
export const sendTvAiringNotification = functions.firestore
  .document(`${Strings.NOTIFICATION_COL_REF}/{notificationId}`)
  .onCreate(async (snap, context) => {
    const notification = snap.data() as NotificationModel;
    const sendAiringNotification = new SendAiringNotification();

    if (notification === null || notification === undefined) {
      return;
    }
    await sendAiringNotification.processNotification(notification);
  });

/**
 * check tv notification collection list for user tv shows that are airing today
 */
export const triggerNotificationCheck = functions.pubsub

  .schedule("0 8 * * *")
  .timeZone("Africa/Lagos")
  .onRun(async (context) => {
    const fetchAiring = new FetchTvAiring();
    const resultDb = new ResultsDB();
    const notification = new FetchTvNotificationList();

    const airing = await fetchAiring.airing();
    const notificationList = await notification.fetchList();
    const filteredArray = notificationList!.filter((o) =>
      airing!.some(({ id }) => o.id === id)
    );

    await resultDb.add(filteredArray!);
  });

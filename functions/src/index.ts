import functions = require("firebase-functions");
import { SaveNotification } from "./controllers/save_notification";
import { SendAiringNotification } from "./controllers/send_airing_notification";
import { Strings } from "./utils/strings";

export const sendAiringNotification = functions.firestore
  .document(`${Strings.NOTIFICATION_COL_REF}/{notificationId}`)
  .onCreate(new SendAiringNotification().onCreate);

export const saveNotification = functions.https.onRequest(
  new SaveNotification().onRequest
);

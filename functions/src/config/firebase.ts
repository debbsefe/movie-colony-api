import * as admin from "firebase-admin";
import { Strings } from "../utils/strings";

var serviceAccount = require("../../../service-account-file.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const fcm = admin.messaging();
const tokenRef = db.collection(Strings.TOKEN_COL_REF).doc(Strings.API_KEY_TMDB);

export { admin, db, fcm, tokenRef };

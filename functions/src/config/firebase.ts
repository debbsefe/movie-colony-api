import * as admin from "firebase-admin";
import { Strings } from "../utils/strings";

admin.initializeApp();

const db = admin.firestore();
const fcm = admin.messaging();
const tokenRef = db.collection(Strings.TOKEN_COL_REF).doc(Strings.API_KEY_TMDB);

export { admin, db, fcm, tokenRef };

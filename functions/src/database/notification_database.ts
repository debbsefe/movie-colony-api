// import * as admin from "firebase-admin";
import { Notification } from "../models/notification_model";
import { Strings } from "../utils/strings";
import { NotificationMapper } from "../mapper/notification_mapper";
import { DocumentReference } from "@google-cloud/firestore";
import { db } from "../config/firebase";

export class NotificationDB {
  mapper = new NotificationMapper();

  async add(notification: Notification) {
    const collectionRef = db.collection(Strings.NOTIFICATION_COL_REF);
    const docRef =
      notification.id === null || notification.id === undefined
        ? collectionRef.doc()
        : collectionRef.doc(notification.id);
    notification.ref = docRef;
    await docRef.set(this.mapper.toMap(notification));
  }

  async update(notification: Notification) {
    if (notification.ref === null || notification.ref === undefined) {
      await this.add(notification);
    } else {
      await notification.ref.update(this.mapper.toMap(notification));
    }
  }

  async delete(notification: Notification) {
    if (notification.ref !== null && notification.ref !== undefined) {
      await notification.ref.delete();
    }
  }

  async getFromRef(ref: DocumentReference): Promise<Notification | undefined> {
    const snap = await ref.get();
    return this.mapper.fromSnapshot(snap);
  }
}

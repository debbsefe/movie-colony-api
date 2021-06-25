import { DocumentReference } from "@google-cloud/firestore";
import { DBModel } from "../interfaces/db_model";

export class Notification extends DBModel {
  static readonly NOTIFICATION_FIELD = "notification";
  static readonly TV_ID = "id";
  static readonly TV_NAME = "name";
  static readonly FCM = "fcm";

  notification: DocumentReference | undefined;
  tvId: number | undefined;
  tvName: String | undefined;
  fcm: String | undefined;

  constructor({
    ref,
    notification,
    tvId,
    tvName,
    fcm,
  }: {
    ref?: DocumentReference;
    notification?: DocumentReference;
    tvId?: number;
    tvName?: String;
    fcm?: String;
  }) {
    super(ref);
    this.notification = notification;
    this.tvId = tvId;
    this.tvName = tvName;
    this.fcm = fcm;
  }
}

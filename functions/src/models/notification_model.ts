import { DocumentReference } from "@google-cloud/firestore";
import { DBModel } from "../interfaces/db_model";

export class Notification extends DBModel {
  static readonly RESULT_FIELD = "results";

  result: Array<Result> | undefined;

  constructor({
    ref,
    result,
  }: {
    ref?: DocumentReference;
    result?: Array<Result>;
  }) {
    super(ref);
    this.result = result;
  }
}
export class Result {
  static readonly TV_ID = "id";
  static readonly TV_NAME = "name";
  static readonly FCM = "fcm";
  tvId: number | undefined;
  tvName: String | undefined;
  fcm: String | undefined;

  constructor({
    tvId,
    tvName,
    fcm,
  }: {
    tvId?: number;
    tvName?: String;
    fcm?: String;
  }) {
    this.tvId = tvId;
    this.tvName = tvName;
    this.fcm = fcm;
  }
}

import { IMapper, IMapper2 } from "../interfaces/mapper";
import { Notification, Result } from "../models/notification_model";

export class NotificationMapper implements IMapper<Notification> {
  mapper = new ResultMapper();

  fromSnapshot(
    snapshot: FirebaseFirestore.DocumentSnapshot
  ): Notification | undefined {
    if (snapshot === null || snapshot === undefined) return undefined;
    const data = snapshot.data();
    if (data === null || data === undefined) return undefined;

    return new Notification({
      ref: snapshot.ref,
      result: this.mapper.fromSnapshot(data[Notification.RESULT_FIELD]),
    });
  }

  toMap(item: Notification): FirebaseFirestore.DocumentData {
    return {
      [Notification.RESULT_FIELD]: item.result,
    };
  }
}

export class ResultMapper implements IMapper2<Array<Result>> {
  fromSnapshot(snapshot: Array<any>): Array<Result> | undefined {
    if (snapshot === null || snapshot === undefined) return undefined;
    const data = snapshot;
    if (data === null || data === undefined) return undefined;
    return data.map(
      (val) =>
        ({
          tvId: val[Result.TV_ID],
          tvName: val[Result.TV_NAME],
          fcm: val[Result.FCM],
        } as Result)
    );
  }

  toMap(item: Result): any {
    return {
      [Result.TV_ID]: item.tvId,
      [Result.TV_NAME]: item.tvName,
      [Result.FCM]: item.fcm,
    };
  }
}

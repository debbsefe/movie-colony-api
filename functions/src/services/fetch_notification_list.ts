import { ResultsDB } from "../database/results_database";
import { Results } from "../models/notification_model";

export class FetchNotificationList {
  mapper = new ResultsDB();

  async fetchList(): Promise<Results[] | undefined> {
    const ref = await this.mapper.getNotificationList();
    return ref;
  }
}

import { ResultsDB } from "../databases/results_database";
import { Results } from "../models/notification_model";

export class FetchNotificationList {
  resultsDb = new ResultsDB();

  async fetchList(): Promise<Results[] | undefined> {
    const ref = await this.resultsDb.get();
    return ref;
  }
}

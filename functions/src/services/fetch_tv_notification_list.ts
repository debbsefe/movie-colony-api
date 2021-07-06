import { ResultsDB } from "../databases/results_database";
import { Results } from "../models/notification_model";

export class FetchTvNotificationList {
  resultsDb = new ResultsDB();

  /**
   * fetch all tv notification list from cloud firestore
   * @return Results[]
   */
  async fetchList(): Promise<Results[] | undefined> {
    const ref = await this.resultsDb.get();
    return ref;
  }
}

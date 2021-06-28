import { ResultsDB } from "../databases/results_database";
import { AbstractMethods } from "../interfaces/abstract_methods";
import { FetchAiring } from "../services/fetch_airing";
import { FetchNotificationList } from "../services/fetch_notification_list";

export class SaveNotification extends AbstractMethods {
  fetchAiring = new FetchAiring();
  resultDb = new ResultsDB();
  notification = new FetchNotificationList();

  async onRequest(req: any, res: any): Promise<void> {
    const airing = await this.fetchAiring.airing();
    const notificationList = await this.notification.fetchList();
    const filteredArray = notificationList!.filter((o) =>
      airing!.some(({ id }) => o.id === id)
    );

    console.log(filteredArray);
    await this.resultDb.add(filteredArray!);
  }
}

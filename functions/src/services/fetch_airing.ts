import axios, { AxiosResponse } from "axios";
import { TokenDB } from "../database/token_database";
import { NotificationModel, Results } from "../models/notification_model";
import { FetchNotificationList } from "./fetch_notification_list";

export class FetchAiring {
  results: Results[] = [];
  populateData = (data: Results[]) => this.results.push(...data);
  tokenDb = new TokenDB();
  notification = new FetchNotificationList();

  async airing(): Promise<Results[] | undefined> {
    const token: string | undefined = await this.tokenDb.getFromRef();

    const url: string = `https://api.themoviedb.org/3/tv/airing_today?api_key=${token}`;

    try {
      const res: AxiosResponse<NotificationModel> = await axios.get(url);
      const model = res.data;
      const totalPages: number | undefined = model.total_pages;
      this.populateData(model.results!);

      await this.showingToday(totalPages!, url);
      const notificationList = await this.notification.fetchList();
      const filteredArray = notificationList!.filter((o) =>
        this.results!.some(({ id }) => o.id === id)
      );

      console.log(filteredArray);
      return filteredArray;
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }

  async showingToday(totalPages: number, url: string) {
    try {
      for (let index = 1; index < totalPages; index++) {
        const page = index + 1;
        const res: AxiosResponse<NotificationModel> = await axios.get(
          `${url}&page=${page}`
        );
        const model = res.data;
        this.populateData(model.results!);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }
}

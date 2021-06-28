import axios, { AxiosResponse } from "axios";
import { TokenDB } from "../databases/token_database";
import { NotificationModel, Results } from "../models/notification_model";

export class FetchAiring {
  /**
   * result initialized to an empty array
   */
  results: Results[] = [];

  /**
   * add data to results array
   */
  populateData = (data: Results[]) => this.results.push(...data);
  tokenDb = new TokenDB();

  /**
   * @returns an array of results that includes tv shows that are airing today
   */
  async airing(): Promise<Results[]> {
    /**
     * api token fetched from firestore db
     */
    const token: string | undefined = await this.tokenDb.get();

    const url: string = `https://api.themoviedb.org/3/tv/airing_today?api_key=${token}`;

    try {
      const res: AxiosResponse<NotificationModel> = await axios.get(url);
      const model = res.data;
      const totalPages: number | undefined = model.total_pages;
      this.populateData(model.results!);

      await this.airingLoop(totalPages!, url);
      return this.results;
    } catch (err) {
      console.log("Error: ", err.message);
      throw err;
    }
  }

  /**
   * for loop through the results returned from the api and save to list, loop is based on total number of pages
   */
  async airingLoop(totalPages: number, url: string): Promise<void> {
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

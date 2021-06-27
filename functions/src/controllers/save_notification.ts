import { ResultsDB } from "../database/results_database";
import { AbstractMethods } from "../interfaces/abstract_methods";
import { FetchAiring } from "../services/fetch_airing";

export class SaveNotification extends AbstractMethods {
  fetchAiring = new FetchAiring();
  resultDb = new ResultsDB();

  async onRequest(req: any, res: any): Promise<void> {
    const result = await this.fetchAiring.airing();
    await this.resultDb.add(result!);
  }
}

import { db } from "../config/firebase";
import { Strings } from "../utils/strings";

export class TokenDB {
  /**
   * fetch token from cloud firestore
   * @return string
   */
  async get(): Promise<string | undefined> {
    const ref = db.collection(Strings.TOKEN_COL_REF).doc(Strings.API_KEY_TMDB);
    const snap = await ref.get();
    return snap.data()!["key"];
  }
}

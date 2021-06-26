import { DBModel } from "./db_model";
import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";

/**
 * mapper interface to convert data to and from firebase using type system to ensure error-free code
 */
export interface IMapper<T extends DBModel> {
  fromSnapshot(snapshot: DocumentSnapshot): T | undefined;
  toMap(item: T): DocumentData;
}

export interface IMapper2<T> {
  fromSnapshot(snapshot: any): T | undefined;
  toMap(item: T): DocumentData;
}

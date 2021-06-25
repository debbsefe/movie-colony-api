import { DocumentReference } from "@google-cloud/firestore";

/**
 *abstract class / base model for all other models
 */
export abstract class DBModel {
  ref: DocumentReference | undefined;
  id: string | undefined;

  protected constructor(ref?: DocumentReference) {
    this.ref = ref;
    this.id = ref?.id;
  }
}

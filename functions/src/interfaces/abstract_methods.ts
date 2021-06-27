import { DocumentSnapshot } from "@google-cloud/firestore";
import { Change, EventContext } from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/providers/https";

export abstract class AbstractMethods {
  async onCreate(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    throw new Error("onCreate not implemented yet!!");
  }

  async onDelete(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    throw new Error("onDelete not implemented yet!!");
  }

  async onUpdate(
    change: Change<DocumentSnapshot>,
    context: EventContext
  ): Promise<any> {
    throw new Error("onUpdate not implemented yet!!");
  }

  async onWrite(
    change: Change<DocumentSnapshot>,
    context: EventContext
  ): Promise<any> {
    throw new Error("onWrite not implemented yet!!");
  }

  async onCall(data: any, context: CallableContext): Promise<any> {
    throw new Error("onCall not implemented yet!!");
  }

  async onRequest(req: any, resp: Response): Promise<any> {
    throw new Error("onRequest not implemented yet!!");
  }
}

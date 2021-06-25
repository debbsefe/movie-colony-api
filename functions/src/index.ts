import axios from "axios";
import functions = require("firebase-functions");
import { SendNotification } from "./services/send_notification";
import { Strings } from "./utils/strings";

export const sendNotification = functions.firestore
  .document(`${Strings.NOTIFICATION_COL_REF}/{notificationId}`)
  .onCreate(new SendNotification().onCreate);

const token: String = "fetch from firestore";
const lst: any[] = [];
const newList: number[] = [];
const idList = [122017, 68921, 105249];

const populateData = (data: Array<any>) => lst.push(...data);

const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${token}`;

showing();
async function showing() {
  try {
    const res = await axios.get(url);

    const result = res.data;
    const list: Array<any> = result["results"];
    const totalPages: number = result["total_pages"];
    populateData(list);

    await showingToday(totalPages);
    mapped(lst);
    const filteredArray = newList.filter((value) => idList.includes(value));
    console.log(filteredArray);
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

function mapped(list: Array<any>) {
  lst.map((x) => {
    const id = x["id"];
    newList.push(id);
  });
}

async function showingToday(totalPages: number) {
  try {
    for (let index = 1; index < totalPages; index++) {
      const page = index + 1;
      const res = await axios.get(`${url}&page=${page}`);

      const result = res.data;
      const list: Array<any> = result["results"];
      populateData(list);
    }
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

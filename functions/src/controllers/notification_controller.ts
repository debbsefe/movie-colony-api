import { Response } from "express";
import { db } from "../config/firebase";

const airingToday = db.collection("airing_today").doc();

const airingTodayObject = {
  id: 1,
  title: "entry title here",
  text: "entry text here",
};

airingToday.set(airingTodayObject);

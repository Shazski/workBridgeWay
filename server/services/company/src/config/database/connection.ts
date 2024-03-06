import mongoose from "mongoose";
import { MONGO_URL } from "../envConfig/env";

export const connect = async () => {
  try {
    await mongoose.connect(String(MONGO_URL));
    console.log("company service database connected successfully");
  } catch (e) {
    console.error("Error in connecting to database", e);
  }
};
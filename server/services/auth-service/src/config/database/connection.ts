import mongoose from "mongoose";
import { MONGO_URL } from "../envConfig/env";

export const connect = async () => {
  try {
    mongoose.connect(String(MONGO_URL));
    console.log("Auth database connected successfully");
  } catch (error) {
    console.log(error, "<< Something went wrong in mongoose Connection>>");
  }
};

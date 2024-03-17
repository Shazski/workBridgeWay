import { Schema } from "mongoose";

export interface IChatroom extends Document {
  roomCreater: Schema.Types.ObjectId;
  roomJoiner: Schema.Types.ObjectId;
  lastMessage: string;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
 }
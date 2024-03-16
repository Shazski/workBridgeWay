import mongoose, { Schema, Document } from "mongoose";

interface IChatroom extends Document {
 roomCreater: Schema.Types.ObjectId;
 roomJoiner: Schema.Types.ObjectId;
 lastMessage: string;
 lastMessageTime: Date;
 createdAt: Date;
 updatedAt: Date;
}

const ChatRoomSchema: Schema<IChatroom> = new Schema(
 {
  roomCreater: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  roomJoiner: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  lastMessage: {
   messagePerson: { type: String },
   message: { String },
  },
  lastMessageTime: { type: Date },
 },
 {
  timestamps: true,
 }
);

const ChatRoomCollection = mongoose.model<IChatroom>(
 "chatrooms",
 ChatRoomSchema
);

export default ChatRoomCollection;

export interface ChatRoomDocument extends IChatroom {
 createdAt: Date;
 updatedAt: Date;
}

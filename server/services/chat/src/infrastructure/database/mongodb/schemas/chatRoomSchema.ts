import mongoose, { Schema, Document } from "mongoose";
import { IChatroom } from "../../../../domain/entity";


const ChatRoomSchema: Schema<IChatroom> = new Schema(
 {
  roomCreater: {
   type: Schema.Types.ObjectId, // companyId 
   required: true,
  },
  roomJoiner: {
   type: Schema.Types.ObjectId, //userId
   required: true,
  },
  lastMessage: {
   messagePerson: { type: String }, //last message in the chat with personName and message
   message: { String },
  },
  lastMessageTime: { type: Date }, // Time of last message for sorting chat with message person
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

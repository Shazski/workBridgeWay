import { MessageEntity } from "../../../../domain/entity/messageEntity";
import { Schema, model } from "mongoose";

const messageSchema = new Schema<MessageEntity>(
 {
  roomId: {
   type: String,
   required: true,
  },
  senderId: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  message: {
   type: Schema.Types.Mixed,
   required: true,
  },
  messageType: {
   type: String,
   enum: ["text", "image", "audio", "video", "file"],
   default: "text",
  },
  recieverSeen: {
   type: Boolean,
   default: false,
  },
 },
 {
  timestamps: true,
 }
);

export const Message = model("messages", messageSchema);

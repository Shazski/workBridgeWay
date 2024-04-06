import { ObjectId } from "mongoose";
import { IChatroom } from "../../../../domain/entity";
import ChatSchema from "../schemas/chatRoomSchema";
import { Message } from "../schemas/messagesSchema";

export const createChatRoom_repo = async (
 chatCredentials: IChatroom
): Promise<IChatroom | boolean> => {
 try {
  const roomExists = await ChatSchema.find({
   roomCreater: chatCredentials.roomCreater,
   roomJoiner: chatCredentials.roomJoiner,
  });
  if (roomExists.length > 0) return false;
  const result = await ChatSchema.create(chatCredentials);

  if (!result) return false;

  return result as IChatroom;
 } catch (error) {
  console.log("<< Something went wrong in createChatRoom repo >>");
  return false;
 }
};
export const getChatUserList_repo = async (
 roomCreater: ObjectId
): Promise<IChatroom[] | boolean> => {
 try {
  const result = await ChatSchema.find({ roomCreater: roomCreater });

  if (!result) return false;

  return result as IChatroom[];
 } catch (error) {
  console.log("<< Something went wrong in getChatUserList repo >>");
  return false;
 }
};
export const getChatCompanyList_repo = async (
 roomJoiner: ObjectId
): Promise<IChatroom[] | boolean> => {
 try {
  const result = await ChatSchema.find({ roomJoiner: roomJoiner });

  if (!result) return false;

  return result as IChatroom[];
 } catch (error) {
  console.log("<< Something went wrong in getChatCompanyList repo >>");
  return false;
 }
};

export const getLastMessagesFromRoom = async (room: string) => {
 try {
  let roomMessages = await Message.aggregate([
   {
    $match: {
     roomId: room,
    },
   },
   {
    $project: {
     messageDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
     message: 1,
     senderId: 1,
     messageType: 1,
     recieverSeen: 1,
     createdAt: 1,
     roomId: 1,
     replyMessage: 1,
    },
   },
   {
    $group: {
     _id: "$messageDate",
     messagesByDate: { $push: "$$ROOT" },
    },
   },
   {
    $sort: { _id: -1 },
   },
  ]);

  return roomMessages;
 } catch (error) {
  console.log(
   error,
   "<< Something went wrong in get last message from room >>"
  );
  throw error; // Optionally rethrow the error to handle it elsewhere
 }
};
export const createMessage = async (messageData: {
 roomId: string;
 senderId: ObjectId;
 message: string;
 messageType?: string;
}) => {
 try {
  let message = await Message.create({ ...messageData });
  return message;
 } catch (error) {
  console.log(error, "<< Something went wrong in createMessage repo >>");
 }
};
export const updateLastMessage = async (messageData: {
 roomCreater: ObjectId;
 roomJoiner: ObjectId;
 message: string;
}) => {
 try {
  const { roomCreater, roomJoiner, message } = messageData;

  let updatedMessage = await ChatSchema.findOneAndUpdate(
   { roomCreater, roomJoiner },
   {
    $set: {
     lastMessage: message,
     lastMessageTime: new Date(),
    },
   },
   { new: true }
  );

  return updatedMessage;
 } catch (error) {
  console.log(error, "<< Something went wrong in updateLastMessage >>");
  throw error;
 }
};

export const makeMessageReceiverSeen = async (
 roomId: string,
 senderId: ObjectId
) => {
 try {
  const updatedMessage = await Message.updateMany(
   { roomId: roomId, senderId: { $ne: senderId } },
   {
    $set: { recieverSeen: true },
   }
  );
  return updatedMessage;
 } catch (error) {
  console.error("Error updating messages:", error);
  throw error;
 }
};
export const getUnreadMessages = async () => {
 try {
  const updatedMessage = await Message.find({ recieverSeen: false });
  return updatedMessage;
 } catch (error) {
  console.error("Error updating messages:", error);
  throw error;
 }
};
export const getCompanyMessageCount = async (companyId: ObjectId) => {
 console.log(
  "🚀 ~ file: chat.repo.ts:159 ~ getCompanyMessageCount ~ companyId:",
  companyId
 );
 try {
  const messageCount = await Message.find({
   senderId: {
    $ne: companyId,
   },
   recieverSeen: false,
  }).countDocuments();
  return messageCount;
 } catch (error) {
  console.error("Error updating messages:", error);
  throw error;
 }
};

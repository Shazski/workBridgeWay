import { IChatroom } from "../../../../domain/entity";
import ChatSchema from "../schemas/chatRoomSchema";

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

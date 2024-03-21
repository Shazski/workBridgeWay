import express from "express";
import { chatController } from "../../presentation/controller";
import { IDependencies } from "../../application/interfaces/IDependencies";
export = (dependencies: IDependencies) => {
 const router = express.Router();

 const {
  createChatRoom,
  getAllChatUserList,
  getAllChatCompanyList,
  getAllUnreadMessages,
 } = chatController(dependencies);

 router.post("/create-chat-room", createChatRoom);
 router.get("/get-chat-user-list", getAllChatUserList);
 router.get("/get-chat-company-list", getAllChatCompanyList);
 router.get("/get-all-unread-messages", getAllUnreadMessages);

 return router;
};

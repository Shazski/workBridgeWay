import express from "express";
import { chatController } from "../../presentation/controller";
import { IDependencies } from "../../application/interfaces/IDependencies";
export = (dependencies: IDependencies) => {
 const router = express.Router();

 const { createChatRoom, getAllChatUserList } = chatController(dependencies);

 router.post("/create-chat-room", createChatRoom);
 router.get("/get-chat-user-list", getAllChatUserList);

 return router;
};

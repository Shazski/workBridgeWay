import express from "express";
import { chatController } from "../../presentation/controller";
import { IDependencies } from "../../application/interfaces/IDependencies";
export = (dependencies: IDependencies) => {
 const router = express.Router();

 const { createChatRoom } = chatController(dependencies);

 router.post("/create-chat-room", createChatRoom);

 return router;
};

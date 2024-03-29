import { IDependencies } from "../../../application/interfaces/IDependencies";
import createChatRoom_controller from "./createChatRoom_controller";
import getAllChatUserList_controller from "./getAllChatUserList_controller";
import getAllChatCompanyList_controller from "./getAllChatCompanyList_controller";
import getAllUnreadMessages_controller from "./getAllUnreadMessages._controller";
export = (dependencies: IDependencies) => {
 return {
  createChatRoom: createChatRoom_controller(dependencies),
  getAllChatUserList: getAllChatUserList_controller(dependencies),
  getAllChatCompanyList: getAllChatCompanyList_controller(dependencies),
  getAllUnreadMessages: getAllUnreadMessages_controller(dependencies),
 };
};

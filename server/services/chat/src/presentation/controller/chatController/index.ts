import { IDependencies } from "../../../application/interfaces/IDependencies";
import createChatRoom_controller from "./createChatRoom_controller";
import getAllChatUserList_controller from './getAllChatUserList_controller'
export = (dependencies: IDependencies) => {
    return {
        createChatRoom:createChatRoom_controller(dependencies),
        getAllChatUserList:getAllChatUserList_controller(dependencies)
    }
}
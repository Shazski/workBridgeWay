import { IDependencies } from "../../../application/interfaces/IDependencies";
import createChatRoom_controller from "./createChatRoom_controller";

export = (dependencies: IDependencies) => {
    return {
        createChatRoom:createChatRoom_controller(dependencies)
    }
}
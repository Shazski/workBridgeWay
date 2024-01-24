import { IDependenciesData } from "../../../application/interfaces/IDependenciesData"
import editUser_controller from "./editUser_controller"
import updatePassword_controller from "./updatePassword_controller"
export = (dependencies: IDependenciesData) => {
    return {
        editUser:editUser_controller(dependencies),
        updatePassword:updatePassword_controller(dependencies)
    }
}
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData"
import editUser_controller from "./editUser_controller"
import updatePassword_controller from "./updatePassword_controller"
import updateEmail_controller from "./updateEmail_controller"
export = (dependencies: IDependenciesData) => {
    return {
        editUser:editUser_controller(dependencies),
        updatePassword:updatePassword_controller(dependencies),
        updateEmail:updateEmail_controller(dependencies)
    }
}
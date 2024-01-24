import { IDependenciesData } from "../../../application/interfaces/IDependenciesData"
import editUser_controller from "./editUser_controller"
export = (dependencies: IDependenciesData) => {
    return {
        editUser:editUser_controller(dependencies)
    }
}
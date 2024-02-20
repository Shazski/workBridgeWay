import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import getAllCompany_controller from "./getAllCompany_controller";
import updateRequest_controller from "./updateRequest_controller";
import getCategoryByCompanyId_controller from './getCategoryByCompany_controller'
import addCategory_controller from "./addCategory_controller";
export = (dependencies:IDependenciesData) => {
    return {
        getAllCompany:getAllCompany_controller(dependencies),
        updateRequest:updateRequest_controller(dependencies),
        getCategory:getCategoryByCompanyId_controller(dependencies),
        addCategory:addCategory_controller(dependencies),
    }
}
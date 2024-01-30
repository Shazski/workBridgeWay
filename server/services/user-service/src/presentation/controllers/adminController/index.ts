import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import getAllCompany_controller from "./getAllCompany_controller";
import updateRequest_controller from "./updateRequest_controller";

export = (dependencies:IDependenciesData) => {
    return {
        getAllCompany:getAllCompany_controller(dependencies),
        updateRequest:updateRequest_controller(dependencies),
    }
}
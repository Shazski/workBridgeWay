import { IDependencies } from "../../../application/interface/IDependencies";
import getCompanyRequest_controller from "./getCompanyRequest_controller";


export = (dependencies: IDependencies) => {
    return {
        getCompanyRequest:getCompanyRequest_controller(dependencies)
    }
}

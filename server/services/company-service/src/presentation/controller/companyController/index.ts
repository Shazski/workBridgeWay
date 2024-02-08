import { IDependencies } from "../../../application/interface/IDependencies";
import updateCompany_controller from "./updateCompany_controller";


export = (dependencies: IDependencies) => {
    return {
        updateCompany:updateCompany_controller(dependencies)
    }
}

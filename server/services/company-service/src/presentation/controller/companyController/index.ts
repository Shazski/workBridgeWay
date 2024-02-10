import { IDependencies } from "../../../application/interface/IDependencies";
import addCategory_controller from "./addCategory_controller";
import postJob_controller from "./postJob_controller";
import updateCompany_controller from "./updateCompany_controller";

export = (dependencies: IDependencies) => {
  return {
    updateCompany: updateCompany_controller(dependencies),
    postJob: postJob_controller(dependencies),
    addCategory:addCategory_controller(dependencies)
  };
};

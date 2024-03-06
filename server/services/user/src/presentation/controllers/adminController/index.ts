import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import getAllCompany_controller from "./getAllCompany_controller";
import updateRequest_controller from "./updateRequest_controller";
import getCategoryByCompanyId_controller from "./getCategoryByCompany_controller";
import addCategory_controller from "./addCategory_controller";
import getAllUsers_controller from "./getAllUsers_controller";
import blockOrUnblockUser_controller from "./blockOrUnblockUser_controller";
export = (dependencies: IDependenciesData) => {
 return {
  getAllCompany: getAllCompany_controller(dependencies),
  updateRequest: updateRequest_controller(dependencies),
  getCategory: getCategoryByCompanyId_controller(dependencies),
  addCategory: addCategory_controller(dependencies),
  getAllUsers: getAllUsers_controller(dependencies),
  blockOrUnblockUser: blockOrUnblockUser_controller(dependencies),
 };
};

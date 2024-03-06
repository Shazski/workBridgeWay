import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const getAllUsers_useCase = (dependencies: IDependenciesData) => {
 const {
  userRepo: { getAllUsers },
 } = dependencies;
 const execute = async (page:number, search:string) => {
  try {
   const usersData = await getAllUsers(page,search)

   if (!usersData) return false;

   return usersData;

  } catch (error) {
   console.log(error, "<<Something went wrong in get users useCase>>");
   return false;
  }
 };

 return {
  execute,
 };
};

import { IDependencies } from "../interfaces/IDependencies";

export const getAllUnreadMessages_useCase = (dependencies: IDependencies) => {
 const {
  chatRepo: { getUnreadMessages },
 } = dependencies;
 const execute = async () => {
  try {
   const result = await getUnreadMessages()
    
   if (!result) return false;
   return result;
  } catch (error) {
   console.log(error, "<< Something went wrong in createChatRoom useCase >>");
   return false;
  }
 };
 return { execute };
};

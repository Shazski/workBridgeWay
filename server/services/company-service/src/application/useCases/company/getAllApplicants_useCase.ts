// import { ObjectId } from "mongoose";
// import { IDependencies } from "../../interface/IDependencies";

// export const getAllApplicants_useCase = (dependencies: IDependencies) => {
//   const {
//     job_repo: { getUserApplications },
//   } = dependencies;

//   const execute = async (companyId:ObjectId) => {
//     try {
//       return await getUserApplications(companyId);
//     } catch (error) {
//       console.log(
//         error,
//         "<< Something went wrong in getAllApplicants_useCase >>"
//       );
//       return false;
//     }
//   };
//   return { execute };
// };

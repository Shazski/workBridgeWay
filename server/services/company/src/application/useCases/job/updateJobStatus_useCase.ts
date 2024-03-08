import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const updateJobStatus_useCase = (dependencies: IDependencies) => {
 const {
  job_repo: { updateJobStatus },
 } = dependencies;
 const execute = async (
  updateData: { status: boolean; id: ObjectId },
  page: number,
  search: string
 ) => {
  try {
   return await updateJobStatus(updateData, page, search);
  } catch (error) {
   console.log(
    error,
    " << Something went wrong in updateApplicantStatus usecase >> "
   );
  }
 };
 return { execute };
};

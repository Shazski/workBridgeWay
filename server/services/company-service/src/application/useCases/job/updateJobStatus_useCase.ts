import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const updateJobStatus_useCase = (dependencies: IDependencies) => {
  const {
    job_repo: { updateJobStatus },
  } = dependencies;
  const execute = async (updateData: { status: boolean; id: ObjectId }) => {
    try {
      return await updateJobStatus(updateData);
    } catch (error) {
      console.log(
        error,
        " << Something went wrong in updatejobStatus usecase >> "
      );
    }
  };
  return { execute };
};

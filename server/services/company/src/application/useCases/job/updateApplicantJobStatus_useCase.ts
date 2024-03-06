import { IDependencies } from "../../interface/IDependencies";
import { IJob } from "../../interface/IJob";

export const updateApplicantJobStatus_useCase = (dependencies: IDependencies) => {
  const {
    job_repo: { editJob },
  } = dependencies;
  const execute = (jobDetails: IJob) => {
    try {
      return editJob(jobDetails);
    } catch (error) {
      console.log(
        error,
        " << Something went wrong in editJob useCase >> "
      );
      return false;
    }
  };

  return { execute };
};

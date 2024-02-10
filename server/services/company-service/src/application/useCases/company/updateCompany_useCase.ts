import { ICompanyData } from "../../../infrastructure/database/mongodb/schema/companySchema";
import { IDependencies } from "../../interface/IDependencies";

export const updateCompany_useCase = (dependencies: IDependencies) => {
  const {
    company_repo: { updateCompany_repo },
  } = dependencies;

  const execute = async (credentials: ICompanyData, id: string) => {
    console.log(
      "incoming call on usecase  update companydasdsadsad....................."
    );
    try {
      return await updateCompany_repo(credentials, id);
    } catch (error) {
      console.log(
        error,
        "<< Something went wrong in update Company useCase >>"
      );
      return false;
    }
  };
  return { execute };
};

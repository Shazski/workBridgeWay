import { ICompany } from "../../../../../domain/entities/company.entity";
import CompanySchema, { ICompanyData } from "../../schema/companySchema";
export const registerCompany = async (
  companyCredentials: ICompany
): Promise<ICompanyData | boolean> => {
  try {
    const newCompany = await CompanySchema.create({
      ...companyCredentials,
    });
    if (!newCompany) return false;

    return newCompany;
  } catch (error) {
    console.log(error,"<<Something went wrong in register company repo >>");
    return false;
  }
};
export const findCompanyByEmail = async (
  companyCredentials: ICompany
): Promise<ICompanyData | boolean> => {
  try {
    const companyExists: ICompanyData | null = await CompanySchema.findOne({
      email: companyCredentials.email,
    });
    if (!companyExists) return false;

    return companyExists;
  } catch (error) {
    console.log("<<Something went wrong in find company by email repo >>");
    return false;
  }
};

export const getAllCompanyData_repo = async (): Promise<
  ICompanyData[] | boolean
> => {
  try {
    const companyData: ICompanyData[] | null = await CompanySchema.find();

    if (!companyData) return false;

    return companyData;
  } catch (error) {
    console.log("Error getting all companies data from repo");
    return false;
  }
};
export const updateRequest = async (credentials: {
  email: string;
  stage: string;
}): Promise<ICompanyData | boolean> => {
  let companyData;
  try {
    if (credentials.stage === "approved") {
      companyData = await CompanySchema.findOneAndUpdate(
        { email: credentials.email },
        {
          approved: true,
          stage: credentials.stage,
        },
        { new: true }
      );
    } else {
      companyData = await CompanySchema.findOneAndUpdate(
        { email: credentials.email },
        {
          approved: false,
          stage: credentials.stage,
        },
        { new: true }
      );
    }

    if (!companyData) return false;

    return companyData;
  } catch (error) {
    console.log("Error getting all companies data from repo");
    return false;
  }
};

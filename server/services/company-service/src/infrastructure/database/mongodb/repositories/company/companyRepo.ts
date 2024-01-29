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
    console.log("<<Something went wrong in register company repo >>");
    return false;
  }
};
export const findCompanyByEmail = async (
  companyCredentials: ICompany
): Promise<ICompanyData | boolean> => {
  try {
    const companyExists:ICompanyData | null = await CompanySchema.findOne({
      email:companyCredentials.email
    });
    if (!companyExists) return false;

    return companyExists;
  } catch (error) {
    console.log("<<Something went wrong in find company by email repo >>");
    return false;
  }
};

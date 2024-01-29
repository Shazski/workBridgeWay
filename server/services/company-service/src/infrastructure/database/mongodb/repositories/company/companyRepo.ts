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

export interface ICompanyData {
  name?: string;
  email?: string;
  password?: string;
  linkedIn?: string | undefined;
  companyLogo?: string | null;
  createdAt?: Date | null;
  stage?: string | null;
  phone?: number | null | number;
  headOffice?: string | null;
  founded?: string | null;
  websiteLink?: string | null;
  description?: string | null;
  techStack?: string[] | null;
}

export interface IJobData {
    _id?: string | null;
  category?: string | null;
  fromSalary?: number | null;
  expiry?: Date | null;
  applicants?: []
  jobDescription?: string | null;
  jobTitle?: string | null;
  requiredSkills?: string[] | null;
  responsibilities?: string[] | null;
  toSalary?: number | null;
  typeOfEmployment?: string | null;
  vacancy?: number | null;
  companyId?: string | null | {name:string, companyLogo:string,headOffice:string,_id:string};
  createdAt?:Date | null;
  status?:boolean | null;
}

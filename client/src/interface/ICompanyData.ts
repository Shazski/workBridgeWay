export interface ICompanyData {
    name?: string,
    email?:string,
    password?:string,
    linkedIn?:string | undefined,
    companyLogo?:string | null
    createdAt?:Date | null
    stage?:string | null
    phone?:number | null | number
    headOffice?:string | null
    founded?: string | null;
    websiteLink?: string | null;
    description?: string | null;
    techStack?: string[] | null;
}
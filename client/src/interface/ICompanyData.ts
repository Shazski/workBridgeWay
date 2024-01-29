export interface ICompanyData {
    name: string,
    email:string,
    password?:string,
    linkedIn:string,
    companyLogo?:string | null
    location?:string
    createdAt?:Date | null
    stage?:string | null
}
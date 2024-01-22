export interface IUserLoginData {
    userName: string | null,
    email:string | null,
    password?:string | null,
    phone?:string | null 
    otp?:number | null,
    profilePic?:string | null
}
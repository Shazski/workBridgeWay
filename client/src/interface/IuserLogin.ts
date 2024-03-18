export interface IUserLoginData {
 userName?: string | null;
 email?: string | null;
 password?: string | null;
 phone?: string | null;
 otp?: number | null;
 profilePic?: string | null;
 showSidebar?: boolean | null;
 dob?: string | number | readonly string[] | undefined | Date;
 socialMedia?: string;
 link?: string;
 toSalary?: number;
 fromSalary?: number;
 typeOfEmployment?: string;
 _id?: string | null;
 status?: boolean | null;
 createdAt?: Date | null;
 resume?:string | null;
 linkedIn?:string | null;
 portfolioURL?:string | null;
 previousJob?:string | null;
 about?:string | null;
 skills?: string[] | null
}

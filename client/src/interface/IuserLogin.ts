export interface IUserLoginData {
  userName?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  otp?: number | null;
  profilePic?: string | File | null | FileList;
  showSidebar?: boolean | null;
  dob?: string | number | readonly string[] | undefined | Date;
  socialMedia?: string;
  link?: string;
}

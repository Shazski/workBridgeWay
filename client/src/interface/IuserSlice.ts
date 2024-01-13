export interface UserState {
    user: null | UserData;
    loading: boolean;
    error: null | string;
  }

 export interface UserData {
    id: number;
    username: string;
    email: string;
    role:string;
  }
import { CSSProperties } from "react";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
 key: "root",
 version: 1,
 storage,
};

export const override: CSSProperties = {
 display: "grid",
 placeItems: "center",
 margin: "0 auto",
 borderColor: "red",
 height: "500px",
};
export const overrideforUpload: CSSProperties = {
 display: "flex",
 justifyContent: "right",
 marginRight:"150px",
 borderColor: "red",
 height: "50px",
};
export const overrideforTyping: CSSProperties = {
 display: "flex",
 justifyContent: "right",
 marginRight:"150px",
 borderColor: "red",
 height: "50px",
};

export type TODO = any

export const CHAT_BASE_URL = "http://localhost:3004/api/v1/chat";
export const AUTH_BASE_URL = "http://localhost:3000/api/v1/auth";
export const USER_BASE_URL = "http://localhost:3001/api/v1/user";
export const ADMIN_BASE_URL = "http://localhost:3001/api/v1/admin";
export const COMPANY_BASE_URL = "http://localhost:3002/api/v1/company";
export const EMPLOYEE_BASE_URL = "http://localhost:3003/api/v1/employee";


export const defaultProfile = "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png"

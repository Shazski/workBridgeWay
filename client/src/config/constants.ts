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

export const CHAT_BASE_URL = "http://localhost:3004/api/v1/chat";
export const AUTH_BASE_URL = "http://localhost:3000/api/v1/auth";
export const USER_BASE_URL = "http://localhost:3001/api/v1/user";
export const ADMIN_BASE_URL = "http://localhost:3001/api/v1/admin";
export const COMPANY_BASE_URL = "http://localhost:3002/api/v1/company";
export const EMPLOYEE_BASE_URL = "http://localhost:3003/api/v1/employee";

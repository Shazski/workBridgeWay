import storage from "redux-persist/lib/storage";

export const persistConfig = {
    key:"root",
    version:1,
    storage
}

export const AUTH_BASE_URL = 'http://localhost:3000/api/v1/auth'
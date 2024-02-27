import { AxiosError } from "axios";
import toast from "react-hot-toast";
import TokenInvalid from "../components/TokenInvalid";
import UserBlocked from './../components/UserBlocked';

export interface MyApiError {
  message: string;
  autherisationFailed: boolean;
  userBlocked: boolean
}

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};
export const multiConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
  credentials: "include",
};

export const appJson = {
  "Content-Type": "application/json",
};

export const handleError = async (
  error: AxiosError<MyApiError>,
  rejectWithValue: (value: string | unknown) => string | unknown
) => {
  if (error.response && error.response.data.message) {
    if (error.response.data?.autherisationFailed) {
      localStorage.removeItem("persist:root");
      toast((t) => <TokenInvalid handleClose={t} />, { duration: 3000, });
      return
    }
    if (error.response.data?.userBlocked) {
      localStorage.removeItem("persist:root");
      toast((t) => <UserBlocked handleClose={t} />, { duration: 3000, });
      return
    }
    return rejectWithValue(error.response.data.message);
  } else {
    return rejectWithValue(error.message);
  }
};

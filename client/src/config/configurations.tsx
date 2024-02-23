import { AxiosError } from "axios";
import toast from "react-hot-toast";
import TokenInvalid from "../components/TokenInvalid";

export interface MyApiError {
  message: string;
  autherisationFailed: boolean;
}

export const config = {
  headers: {
    "Content-Type": "application/json",
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
      toast((t) => (
        <TokenInvalid handleClose = {t} />
      ));
      return
    }
    return rejectWithValue(error.response.data.message);
  } else {
    return rejectWithValue(error.message);
  }
};

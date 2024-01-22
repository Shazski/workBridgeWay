import { AxiosError } from "axios";

export interface MyApiError {
  message: string;
}

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const handleError = (
  error: AxiosError<MyApiError>,
  rejectWithValue: (value: string | unknown) => string | unknown
) => {
  if (error.response && error.response.data.message) {
    console.log(error.response.data.message);

    return rejectWithValue(error.response.data.message);
  } else {
    return rejectWithValue(error.message);
  }
};

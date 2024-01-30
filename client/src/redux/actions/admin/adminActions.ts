import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  MyApiError,
  config,
  handleError,
} from "../../../config/configurations";
import { ADMIN_BASE_URL } from "../../../config/constants";

export const approveOrRejectCompany = createAsyncThunk(
  "company/approveCompany",
 async (credentials: { email: string; stage: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${ADMIN_BASE_URL}/approve-or-reject-request`,
        credentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

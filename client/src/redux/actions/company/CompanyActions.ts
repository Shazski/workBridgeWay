import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios, { AxiosError } from "axios";
import { COMPANY_BASE_URL } from "../../../config/constants";
import {
  MyApiError,
  config,
  handleError,
} from "../../../config/configurations";

export const addCategory = createAsyncThunk(
  "user/addCategory",
  async (categoryData:{category:string, description:string}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${COMPANY_BASE_URL}/add-category`,
        categoryData,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const getCategory = createAsyncThunk(
  "user/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${COMPANY_BASE_URL}/get-category`,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

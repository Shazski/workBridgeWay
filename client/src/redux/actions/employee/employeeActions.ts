import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios, { AxiosError } from "axios";
import { EMPLOYEE_BASE_URL } from "../../../config/constants";
import {
 MyApiError,
 config,
 handleError,
} from "../../../config/configurations";
// import { IJobData } from "../../../interface/ICompanyData";
// import { IEmployee } from "../../../interface/IEmployeeData";

export const getEmployeeSchedules = createAsyncThunk(
 "user/getEmployeeSchedules",
 async (_, { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${EMPLOYEE_BASE_URL}/get-schedules`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getAllUserDetails = createAsyncThunk(
 "user/getAllUserDetails",
 async (_, { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${EMPLOYEE_BASE_URL}/get-user-details`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getEmployeeDetails = createAsyncThunk(
 "user/getEmployeeDetails",
 async (id:string, { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${EMPLOYEE_BASE_URL}/get-employee-details?employeeId=${id}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);

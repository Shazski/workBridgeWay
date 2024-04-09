import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios, { AxiosError } from "axios";
import { EMPLOYEE_BASE_URL } from "../../../config/constants";
import {
 MyApiError,
 config,
 handleError,
} from "../../../config/configurations";

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
 async (id: string, { rejectWithValue }) => {
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
export const updatePassOrFail = createAsyncThunk(
 "user/updatePassOrFail",
 async (
  {
   status,
   scheduleId,
   feedback,
  }: { status: string; scheduleId: string; feedback: string },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.patch(
    `${EMPLOYEE_BASE_URL}/update-pass-or-fail`,
    { status: status, scheduleId: scheduleId, feedback: feedback },
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);

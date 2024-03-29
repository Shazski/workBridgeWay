import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios, { AxiosError } from "axios";
import {
 ADMIN_BASE_URL,
 COMPANY_BASE_URL,
 TODO,
} from "../../../config/constants";
import {
 MyApiError,
 config,
 handleError,
} from "../../../config/configurations";
import { IJobData } from "../../../interface/ICompanyData";
import { IEmployee } from "../../../interface/IEmployeeData";

export const addCategory = createAsyncThunk(
 "user/addCategory",
 async (
  categoryData: { category: string; description: string },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.post(
    `${ADMIN_BASE_URL}/add-category`,
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
   const { data } = await axios.get(`${ADMIN_BASE_URL}/get-categories`, config);
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);

export const postJob = createAsyncThunk(
 "user/postJob",
 async (jobData: TODO, { rejectWithValue }) => {
  try {
   const { data } = await axios.post(
    `${COMPANY_BASE_URL}/post-job`,
    jobData,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const updateJobStatus = createAsyncThunk(
 "user/updateJobStatus",
 async (
  {
   updateData,
   page,
   search,
  }: {
   updateData: { status: boolean; id: string };
   page: number;
   search: string;
  },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.post(
    `${COMPANY_BASE_URL}/update-job-status?page=${page}&search=${search}`,
    updateData,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);

export const getJobs = createAsyncThunk(
 "user/getJobs",
 async (
  { page, search = "" }: { page: number; search?: string },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.get(
    `${COMPANY_BASE_URL}/get-jobs?page=${page}&search=${search}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getJobById = createAsyncThunk(
 "user/getJobsById",
 async (id: string, { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${COMPANY_BASE_URL}/get-job/${id}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const editJobDetails = createAsyncThunk(
 "user/editJobDetails",
 async (jobDetails: IJobData, { rejectWithValue }) => {
  try {
   const { data } = await axios.post(
    `${COMPANY_BASE_URL}/edit-job`,
    jobDetails,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getApplicantsDetails = createAsyncThunk(
 "user/getApplicantsDetails",
 async ({ userId }: { userId: string }, { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${COMPANY_BASE_URL}/get-applicant-details?userId=${userId}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const updateApplicantStatus = createAsyncThunk(
 "user/updateApplicantStatus",
 async (
  updateData: { applicantId: string; jobId: string; status: string },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.patch(
    `${COMPANY_BASE_URL}/update-applicant-status?applicantId=${updateData.applicantId}&jobId=${updateData.jobId}`,
    { stage: updateData.status },
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const scheduleInterviewForUser = createAsyncThunk(
 "user/scheduleInterviewForUser",
 async (
  InterviewData: {
   userId: string;
   jobId: string;
   scheduleData: {
    testType: string;
    date: string;
    time: string;
    employeeId: string;
    roomId: string;
   };
  },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.post(
    `${COMPANY_BASE_URL}/schedule-interview?userId=${InterviewData.userId}&jobId=${InterviewData.jobId}`,
    InterviewData.scheduleData,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const cancelInterviewForUser = createAsyncThunk(
 "user/cancelInterviewForUser",
 async (
  InterviewData: {
   userId: string;
   jobId: string;
   scheduleId: string;
  },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.patch(
    `${COMPANY_BASE_URL}/cancel-interview?userId=${InterviewData.userId}&jobId=${InterviewData.jobId}`,
    { scheduleId: InterviewData.scheduleId },
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const addEmployee = createAsyncThunk(
 "user/addEmployee",
 async (
  employeeData: {
   name: string;
   email: string;
   password: string;
   department: string;
   workType: string;
  },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.post(
    `${COMPANY_BASE_URL}/add-employee`,
    employeeData,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getAllCompanyEmployees = createAsyncThunk(
 "user/getAllCompanyEmployees",
 async (
  { page = 1, search = "" }: { page?: number; search?: string },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.get(
    `${COMPANY_BASE_URL}/get-company-employees?page=${page}&search=${search}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const EditEmployeeData = createAsyncThunk(
 "user/EditEmployeeData",
 async (employeeDetails: IEmployee, { rejectWithValue }) => {
  try {
   const { data } = await axios.patch(
    `${COMPANY_BASE_URL}/edit-company-employee`,
    employeeDetails,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getAllApplicantSchedule = createAsyncThunk(
 "user/getAllApplicantSchedule",
 async (_, { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${COMPANY_BASE_URL}/get-all-applicant-schedule`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getChatUserDetailsByIds = createAsyncThunk(
 "user/getChatUserDetailsByIds",
 async (userIds: string[], { rejectWithValue }) => {
  try {
   const { data } = await axios.get(
    `${COMPANY_BASE_URL}/get-all-user-details-by-ids?userIds=${userIds}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);

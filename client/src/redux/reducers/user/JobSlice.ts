import { createSlice } from "@reduxjs/toolkit";
import {
 getAllJobs,
 getUserApplications,
 getUserpreferredJob,
} from "../../actions/user/userActions";
import { IJobData } from "../../../interface/ICompanyData";
import { getAllUserDetails, getEmployeeSchedules } from "../../actions/employee/employeeActions";
import { getAllApplicantSchedule } from "../../actions/company/CompanyActions";
import { TODO } from "../../../config/constants";

const jobSlice = createSlice({
 name: "profile",
 initialState: {
  error: null as string | null,
  loading: false as boolean,
  jobs: null as TODO | null,
  jobsCount: null as TODO | null,
  userAppliedJobs: null as TODO | null,
  userPreferredJobs: null as IJobData[] | null,
  userAppliedJobsCount: null as number | null,
  scheduleData: null as TODO | null,
  companyScheduleData: null as TODO | null,
  allUsers: null as TODO | null
 },
 reducers: {},

 extraReducers(builder) {
  builder
   .addCase(getAllJobs.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getAllJobs.fulfilled, (state, action) => {
    state.loading = false;
    state.jobs = action.payload[0] as IJobData[];
    state.jobsCount = action.payload[1] as TODO;
    state.error = null;
   })
   .addCase(getAllJobs.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
   .addCase(getUserApplications.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getUserApplications.fulfilled, (state, action) => {
    state.loading = false;
    state.userAppliedJobs = action.payload[0] as TODO;
    state.userAppliedJobsCount = action.payload[1] as number;
    state.error = null;
   })
   .addCase(getUserApplications.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
   .addCase(getUserpreferredJob.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getUserpreferredJob.fulfilled, (state, action) => {
    console.log(action.payload, "payloadData");
    state.loading = false;
    state.userPreferredJobs = action.payload as IJobData[];
    state.error = null;
   })
   .addCase(getUserpreferredJob.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
   .addCase(getEmployeeSchedules.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getEmployeeSchedules.fulfilled, (state, action) => {
    console.log(action.payload, "payloadData");
    state.loading = false;
    state.scheduleData = action.payload as TODO;
    state.error = null;
   })
   .addCase(getEmployeeSchedules.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
   .addCase(getAllApplicantSchedule.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getAllApplicantSchedule.fulfilled, (state, action) => {
    console.log(action.payload, "payloadData");
    state.loading = false;
    state.companyScheduleData = action.payload as TODO;
    state.error = null;
   })
   .addCase(getAllApplicantSchedule.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
   .addCase(getAllUserDetails.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getAllUserDetails.fulfilled, (state, action) => {
    state.loading = false;
    state.allUsers = action.payload as TODO;
    state.error = null;
   })
   .addCase(getAllUserDetails.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
 },
});

export const { actions: userActions } = jobSlice;

export default jobSlice.reducer;

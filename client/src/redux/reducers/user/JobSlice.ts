import { createSlice } from "@reduxjs/toolkit";
import { getAllJobs, getUserApplications } from "../../actions/user/userActions";
import { IJobData } from "../../../interface/ICompanyData";

const jobSlice = createSlice({
 name: "profile",
 initialState: {
  error: null as string | null,
  loading: false as boolean,
  jobs: null as any | null,
  jobsCount: null as any | null,
  userAppliedJobs: null as any | null
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
    state.jobsCount = action.payload[1] as any;
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
    state.userAppliedJobs = action.payload as any
    state.error = null;
   })
   .addCase(getUserApplications.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   })
 },
});

export const { actions: userActions } = jobSlice;

export default jobSlice.reducer;

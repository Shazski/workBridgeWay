import { createSlice } from "@reduxjs/toolkit";
import { ICompanyData, IJobData } from "../../../interface/ICompanyData";
import { getCategory, getJobs } from "../../actions/company/CompanyActions";
const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null as ICompanyData | null,
    category: null as string[] | null,
    jobs: null as IJobData[] | null,
    loading: false as boolean,
    error: null as string | null,
  },
  reducers: {
    pushCategory: (state, action) => {
      state.category?.push(action.payload);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.error = null;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.category = null;
      })
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.jobs = null;
      })
  },
});
export const { pushCategory } = companySlice.actions;
export default companySlice.reducer;

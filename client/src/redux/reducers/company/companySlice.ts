import { createSlice } from "@reduxjs/toolkit";
import { ICompanyData, IJobData } from "../../../interface/ICompanyData";
import {
  getCategory,
  getJobById,
  getJobs,
} from "../../actions/company/CompanyActions";
const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null as ICompanyData | null,
    category: null as string[] | null,
    jobs: null as IJobData[] | null,
    editJob: null as IJobData | null,
    loading: false as boolean,
    error: null as string | null,
  },
  reducers: {
    pushCategory: (state, action) => {
      state.category?.push(action.payload);
    },
    pushSkill: (state, action) => {
      state.editJob?.requiredSkills?.push(action.payload);
    },
    pushResponsibilities: (state, action) => {
      state.editJob?.responsibilities?.push(action.payload);
    },
    popSkills: (state, action) => {
      state.editJob!.requiredSkills = state.editJob?.requiredSkills?.filter(
        (value) => value !== action?.payload
      );
    },
    popResponsibilities: (state, action) => {
      state.editJob!.responsibilities = state.editJob?.responsibilities?.filter(
        (value) => action?.payload !== value
      );
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
      .addCase(getJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.editJob = action.payload;
        state.error = null;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.editJob = null;
      });
  },
});
export const {
  pushCategory,
  pushSkill,
  pushResponsibilities,
  popSkills,
  popResponsibilities,
} = companySlice.actions;
export default companySlice.reducer;

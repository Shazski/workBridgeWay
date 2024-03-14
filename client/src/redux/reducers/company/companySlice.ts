import { createSlice } from "@reduxjs/toolkit";
import { ICompanyData, IJobData } from "../../../interface/ICompanyData";
import {
 EditEmployeeData,
 addEmployee,
 cancelInterviewForUser,
 getAllCompanyEmployees,
 getApplicantsDetails,
 getCategory,
 getJobById,
 getJobs,
 scheduleInterviewForUser,
} from "../../actions/company/CompanyActions";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { IEmployee } from "../../../interface/IEmployeeData";
const companySlice = createSlice({
 name: "company",
 initialState: {
  company: null as ICompanyData | null,
  category: null as string[] | null,
  jobs: null as IJobData[] | null,
  editJob: null as IJobData | null,
  loading: false as boolean,
  error: null as string | null,
  companyJobCount: null as number | null,
  applicantData: null as IUserLoginData | null,
  pendingApplicantsCount: null as any | null,
  employees: null as IEmployee[] | null,
  employeesCount: null as number | null,
  todayScheduleCount: null as number | null
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
  changeStatus: (state, action: { payload: any }) => {
   const updatedApplicants: any = (state.editJob?.applicants || []).map(
    (applicant: any) => {
     if (
      applicant.applicantId === action.payload.applicantId &&
      state.editJob?._id === action.payload.jobId
     ) {
      return {
       ...applicant,
       hiringStage: action.payload.status,
      };
     }
     return applicant;
    }
   );

   state.editJob!.applicants = updatedApplicants;
  },
  updateLiveAndClose: (state, action) => {
   state.jobs?.map((job) =>
    job._id === action.payload ? (job.status = !job.status) : ""
   );
  },
  makeCompanyErrorDisable: (state) => {
   state.error = "";
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
    state.jobs = action.payload[0];
    state.companyJobCount = action.payload[1];
    state.pendingApplicantsCount = action.payload[2];
    state.todayScheduleCount = action.payload[3];
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
   })
   .addCase(getApplicantsDetails.pending, (state) => {
    state.loading = true;
   })
   .addCase(getApplicantsDetails.fulfilled, (state, action) => {
    state.loading = false;
    state.applicantData = action.payload;
    state.error = null;
   })
   .addCase(getApplicantsDetails.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.editJob = null;
   })
   .addCase(cancelInterviewForUser.pending, (state) => {
    state.loading = true;
   })
   .addCase(cancelInterviewForUser.fulfilled, (state, action) => {
    state.loading = false;
    state.editJob = action.payload;
    state.error = null;
   })
   .addCase(cancelInterviewForUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.editJob = null;
   })
   .addCase(scheduleInterviewForUser.pending, (state) => {
    state.loading = true;
   })
   .addCase(scheduleInterviewForUser.fulfilled, (state, action) => {
    state.loading = false;
    state.editJob = action.payload;
    state.error = null;
   })
   .addCase(scheduleInterviewForUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.editJob = null;
   })
   .addCase(addEmployee.pending, (state) => {
    state.loading = true;
   })
   .addCase(addEmployee.fulfilled, (state, { payload }) => {
    state.loading = false;
    if (state.employees === null) {
     state.employees = [payload];
    } else {
     state.employees.push(payload);
    }
    state.error = null;
   })
   .addCase(addEmployee.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.editJob = null;
   })
   .addCase(getAllCompanyEmployees.pending, (state) => {
    state.loading = true;
   })
   .addCase(getAllCompanyEmployees.fulfilled, (state, action) => {
    state.loading = false;
    state.employees = action.payload[0];
    state.employeesCount = action.payload[1];
    state.error = null;
   })
   .addCase(getAllCompanyEmployees.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.editJob = null;
   })
   .addCase(EditEmployeeData.pending, (state) => {
    state.loading = true;
   })
   .addCase(EditEmployeeData.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.employees =
     state.employees?.map((employee) =>
      employee._id === payload._id ? payload : employee
     ) || state.employees;
    state.error = null;
   })
   .addCase(EditEmployeeData.rejected, (state, action) => {
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
 updateLiveAndClose,
 changeStatus,
 makeCompanyErrorDisable,
} = companySlice.actions;
export default companySlice.reducer;

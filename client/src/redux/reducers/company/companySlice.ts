import { createSlice } from "@reduxjs/toolkit";
import { ICompanyData } from "../../../interface/ICompanyData";
const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null as ICompanyData | null,
    loading: false as boolean,
    error: null as string | null,
  },
  reducers: {},

  extraReducers(builder) {
    builder;
  },
});

export default companySlice.reducer

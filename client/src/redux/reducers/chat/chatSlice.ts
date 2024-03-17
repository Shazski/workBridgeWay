import { createSlice } from "@reduxjs/toolkit";
import {
 getAllChatCompanyList,
 getAllChatUserList,
} from "../../actions/chat/chatActions";
import { getCompanyById } from "../../actions/user/userActions";
import { ICompanyData } from "../../../interface/ICompanyData";

const chatSlice = createSlice({
 name: "admin",
 initialState: {
  chatLoading: null as boolean | null,
  chatUserList: null as any[] | null,
  chatCompanyList: null as any[] | null,
  messages: null as any | null,
  chatError: null as string | null,
  companyDetails: null as ICompanyData | null,
 },
 reducers: {},

 extraReducers: (builder) => {
  builder
   .addCase(getAllChatUserList.pending, (state) => {
    state.chatLoading = true;
   })
   .addCase(getAllChatUserList.fulfilled, (state, { payload }) => {
    state.chatLoading = false;
    state.chatUserList = payload;
    state.chatError = null;
   })
   .addCase(getAllChatUserList.rejected, (state, { payload }) => {
    state.chatLoading = false;
    state.chatError = payload as string;
    state.chatUserList = null;
   })
   .addCase(getAllChatCompanyList.pending, (state) => {
    state.chatLoading = true;
   })
   .addCase(getAllChatCompanyList.fulfilled, (state, { payload }) => {
    state.chatLoading = false;
    state.chatCompanyList = payload;
    state.chatError = null;
   })
   .addCase(getAllChatCompanyList.rejected, (state, { payload }) => {
    state.chatLoading = false;
    state.chatError = payload as string;
    state.chatCompanyList = null;
   })
   .addCase(getCompanyById.pending, (state) => {
    state.chatLoading = true;
   })
   .addCase(getCompanyById.fulfilled, (state, { payload }) => {
    state.chatLoading = false;
    state.companyDetails = payload;
    state.chatError = null;
   })
   .addCase(getCompanyById.rejected, (state, { payload }) => {
    state.chatLoading = false;
    state.chatError = payload as string;
    state.companyDetails = null;
   });
 },
});
// export const {  } = adminSlice.actions;
export default chatSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
 getAllChatCompanyList,
 getAllChatUserList,
} from "../../actions/chat/chatActions";
import {
 getChatCompanyDetailsByIds,
 getCompanyById,
} from "../../actions/user/userActions";
import { ICompanyData } from "../../../interface/ICompanyData";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { getChatUserDetailsByIds } from "../../actions/company/CompanyActions";
import { TODO } from "../../../config/constants";

const chatSlice = createSlice({
 name: "admin",
 initialState: {
  chatLoading: null as boolean | null,
  chatUserList: null as TODO[] | null,
  chatCompanyList: [] as TODO[],
  messages: null as TODO | null,
  chatError: null as string | null,
  companyDetails: null as ICompanyData | null,
  companyFullDetails: null as ICompanyData[] | null,
  userFullDetails: null as IUserLoginData[] | null,
 },
 reducers: {
  updateChatCompanyList: (state, action: PayloadAction<TODO>) => {
   state.chatCompanyList = action.payload;
  },
  updateChatUserList: (state, action: PayloadAction<TODO>) => {
   state.chatUserList = action.payload;
  },
 },

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
    state.chatCompanyList = [];
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
   })
   .addCase(getChatCompanyDetailsByIds.pending, (state) => {
    state.chatLoading = true;
   })
   .addCase(getChatCompanyDetailsByIds.fulfilled, (state, { payload }) => {
    state.chatLoading = false;
    state.companyFullDetails = payload;
    state.chatError = null;
   })
   .addCase(getChatCompanyDetailsByIds.rejected, (state, { payload }) => {
    state.chatLoading = false;
    state.chatError = payload as string;
    state.companyFullDetails = null;
   })
   .addCase(getChatUserDetailsByIds.pending, (state) => {
    state.chatLoading = true;
   })
   .addCase(getChatUserDetailsByIds.fulfilled, (state, { payload }) => {
    state.chatLoading = false;
    state.userFullDetails = payload;
    state.chatError = null;
   })
   .addCase(getChatUserDetailsByIds.rejected, (state, { payload }) => {
    state.chatLoading = false;
    state.chatError = payload as string;
    state.userFullDetails = null;
   });
 },
});
export const { updateChatCompanyList, updateChatUserList } =
 chatSlice.actions;
export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getAllChatUserList } from "../../actions/chat/chatActions";

const chatSlice = createSlice({
 name: "admin",
 initialState: {
  chatLoading: null as boolean | null,
  chatUserList: null as any[] | null,
  chatCompanyList: null as any[] | null,
  messages: null as any | null,
  chatError: null as string | null,
 },
 reducers: {},

 extraReducers: (builder) => {
  builder
   .addCase(getAllChatUserList.pending, (state, { payload }) => {
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
   });
 },
});
// export const {  } = adminSlice.actions;
export default chatSlice.reducer;

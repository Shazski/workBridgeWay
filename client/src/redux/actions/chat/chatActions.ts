import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios, { AxiosError } from "axios";
import { CHAT_BASE_URL } from "../../../config/constants";
import {
 MyApiError,
 config,
 handleError,
} from "../../../config/configurations";

export const createChatRoom = createAsyncThunk(
 "user/createChatRoom",
 async (
  ChatRoomData: {
   roomCreater: string;
   roomJoiner: string;
   lastMessage?: { messagePerson: string; message: string };
   lastMessageTime?: string;
  },
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.post(
    `${CHAT_BASE_URL}/create-chat-room`,
    ChatRoomData,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);
export const getAllChatUserList = createAsyncThunk(
 "user/getAllChatUserList",
 async (
  roomCreaterId:string,
  { rejectWithValue }
 ) => {
  try {
   const { data } = await axios.get(
    `${CHAT_BASE_URL}/get-chat-user-list?roomCreater=${roomCreaterId}`,
    config
   );
   return data;
  } catch (error) {
   const axiosError = error as AxiosError<MyApiError>;
   return handleError(axiosError, rejectWithValue);
  }
 }
);

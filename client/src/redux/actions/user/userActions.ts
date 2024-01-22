import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios"
import { MyApiError, config, handleError } from "../../../config/configurations";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { AUTH_BASE_URL } from "../../../config/constants";

export const userSignUp = createAsyncThunk('user/userSignUp', async (userCredentials:IUserLoginData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_BASE_URL}/sign-up`, userCredentials, config)
        return data
    } catch (error) {
        const axiosError = error as AxiosError<MyApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})
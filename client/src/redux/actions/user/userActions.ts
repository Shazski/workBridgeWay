import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios"
import { MyApiError, config, handleError } from "../../../config/configurations";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { AUTH_BASE_URL, USER_BASE_URL } from "../../../config/constants";

export const userSignUp = createAsyncThunk('user/userSignUp', async (userCredentials:IUserLoginData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_BASE_URL}/sign-up`, userCredentials, config)
        return data
    } catch (error) {
        const axiosError = error as AxiosError<MyApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})
export const googleAuth = createAsyncThunk('user/googleAuth', async (userCredentials:IUserLoginData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_BASE_URL}/google`, userCredentials, config)
        return data
    } catch (error) {
        const axiosError = error as AxiosError<MyApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${AUTH_BASE_URL}/logout`, config)
        return data
    } catch (error) {
        const axiosError = error as AxiosError<MyApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})

export const editUser = createAsyncThunk('user/editUser', async (userCredentials:IUserLoginData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_BASE_URL}/edit-user`, userCredentials, config)
        return data
    } catch (error) {
        const axiosError = error as AxiosError<MyApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  MyApiError,
  config,
  handleError,
} from "../../../config/configurations";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { AUTH_BASE_URL, USER_BASE_URL } from "../../../config/constants";
import { ICompanyData } from "../../../interface/ICompanyData";

export const userSignUp = createAsyncThunk(
  "user/userSignUp",
  async (userCredentials: IUserLoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_BASE_URL}/sign-up`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const googleAuth = createAsyncThunk(
  "user/googleAuth",
  async (userCredentials: IUserLoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_BASE_URL}/google`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${AUTH_BASE_URL}/logout`, config);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (userCredentials: IUserLoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/edit-user`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const changeUserPassowrd = createAsyncThunk(
  "user/changeUserPassowrd",
  async (
    userCredentials: {
      newPassword: string;
      oldPassword: string;
      email?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/update-password`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const changeUserEmail = createAsyncThunk(
  "user/changeUserEmail",
  async (
    userCredentials: {
      email: string;
      oldEmail?: string;
      otp?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/update-email`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const addSkill = createAsyncThunk(
  "user/addSkill",
  async (
    userCredentials: {
      email: string;
      skill: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/add-skill`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const removeSkill = createAsyncThunk(
  "user/removeSkill",
  async (
    userCredentials: {
      email: string;
      skill: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/remove-skill`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const updateUserAbout = createAsyncThunk(
  "user/updateUserAbout",
  async (
    userCredentials: {
      email: string;
      about: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/update-about`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const updateUserSocialLinks = createAsyncThunk(
  "user/updateUserSocialLinks",
  async (
    userCredentials: {
      email: string;
      socialLinks: {
        socialMedia: string;
        link: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/add-socialLinks`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const removeUserSocialLinks = createAsyncThunk(
  "user/removeUserSocialLinks",
  async (
    userCredentials: {
      email: string;
      socialLinks: {
        socialMedia: string;
        link: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${USER_BASE_URL}/remove-socialLinks`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const companyRegister = createAsyncThunk(
  "user/companyRegister",
  async (userCredentials: ICompanyData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_BASE_URL}/company-register`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (
    userCredentials: any,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${AUTH_BASE_URL}/login`,
        userCredentials,
        config
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<MyApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

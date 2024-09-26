import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Helper/helper";

export const login = createAsyncThunk(
  "auth/login",
  async (data) => {
    try {
      const res = await axiosInstance.post("/api/admin/auth/login", data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    try {
      const res = await axiosInstance.post("/api/admin/auth/forgot-password", data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      const res = await axiosInstance.post("/api/admin/auth/reset-password", data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data) => {
    try {
      const res = await axiosInstance.post("/api/admin/auth/update-password", data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async () => {
    try {
      const res = await axiosInstance.get("/api/admin/auth/profile");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (data) => {
    try {
      console.log(data);
      const res = await axiosInstance.post("/api/admin/auth/update-profile", data,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const getCustomers = createAsyncThunk(
  "auth/getCustomers",
  async () => {
    try {
      const res = await axiosInstance.get("/api/admin/get/customers");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const updateCustomerStatus = createAsyncThunk(
  "auth/updateCustomerStatus",
  async (id) => {
    try {
      const res = await axiosInstance.post(`/api/admin/update/customer/status/${id}`);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const deleteCustomer = createAsyncThunk(
  "auth/deleteCustomer",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/delete/customer/${id}`);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
  }
)
export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    loading: false,
    customers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        // if(action.payload.success){
        // state.user = action.payload.data;
        // }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.loading = false;
        if(action.payload.success){
          state.user = action.payload.data;
        }
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCustomers.pending, (state, action) => {
        state.loading = true;
        state.customers = []
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.customers = action.payload.data
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

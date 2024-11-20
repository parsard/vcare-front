// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../Components/Verification/AxiosConfig";
import { getToken, removeToken } from "../Components/Verification/TokenService";

// تعریف تابع برای بارگذاری پروفایل کاربر
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("توکنی موجود نیست");

      const response = await api.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Return user profile data
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "خطا در بارگذاری اطلاعات پروفایل"
      );
    }
  }
);

// تابع غیرهمزمان برای اعتبارسنجی توکن
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { dispatch }) => {
    const token = getToken();
    if (!token) return false;

    try {
      const response = await api.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // بازگرداندن داده‌های کاربر اگر توکن معتبر باشد
    } catch (error) {
      dispatch(logout()); // حذف توکن در صورت نامعتبر بودن
      return false;
    }
  }
);

// تابع غیرهمزمان برای به‌روزرسانی پروفایل کاربر
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("توکنی موجود نیست");

      const response = await api.put("/api/user", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // داده‌های کاربری به‌روز شده
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "خطا در به‌روزرسانی پروفایل"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null, // نگهداری اطلاعات کاربر
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // تنظیم داده کاربر هنگام ورود
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      removeToken(); // حذف توکن از کوکی‌ها
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload; // ذخیره داده کاربر اگر توکن معتبر باشد
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    });

    // مدیریت درخواست بارگذاری پروفایل کاربر
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload; // به‌روزرسانی داده کاربر
    });

    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      console.error("Profile fetch error:", action.payload);
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload; // به‌روزرسانی داده‌های کاربر در صورت موفقیت‌آمیز بودن
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      console.error("Profile update error:", action.payload);
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../Components/Verification/AxiosConfig";
import { getToken, removeToken } from "../Components/Verification/TokenService";
import { dark } from "@mui/material/styles/createPalette";
import { data } from "autoprefixer";

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

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("توکنی موجود نیست");
      console.log(token);

      const response = await api.patch("/api/user", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error);

      // بررسی انواع مختلف خطا
      if (error.response) {
        // خطاهای  سرور
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "خطا در به‌روزرسانی پروفایل";

        return rejectWithValue(errorMessage);
      } else if (error.request) {
        return rejectWithValue("خطا در برقراری ارتباط با سرور");
      } else {
        return rejectWithValue(error.message || "خطای نامشخص");
      }
    }
  }
);

export const fetchCities = createAsyncThunk(
  "auth/fetchCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/city");
      const cities = response.data?.data?.cities;

      console.log("Response from server:", response.data);

      // بررسی اینکه data و cities مقدار دارند
      if (!Array.isArray(cities)) {
        console.error("فرمت داده سرور معتبر نیست یا cities خالی است");
        return [];
      }

      return cities;
    } catch (err) {
      console.error("Error fetching cities:", err.message);
      return rejectWithValue(err.response?.data || "خطا در دریافت شهرها");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    cities: [],
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
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload; // Store the list of cities
    });

    builder.addCase(fetchCities.rejected, (state, action) => {
      console.error("City fetch error:", action.payload);
      state.cities = [];
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
      console.error("Full error object:", action.error);
      if (action.payload) {
        state.error = action.payload.message || "Update failed";
      } else {
        // اگر خطای شبکه یا غیره است
        state.error = action.error.message || "Unknown error occurred";
      }
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
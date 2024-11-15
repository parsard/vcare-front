import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./slice/popUpslice";
import authReducer from "./slice/authSlice";

// import citySlice from "./src/slice/citySelectSlice";

const store = configureStore({
  reducer: {
    ui: popupSlice,
    auth: authReducer,
  },
});

export default store;

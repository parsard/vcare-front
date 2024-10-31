import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./slice/popUpslice";
// import citySlice from "./src/slice/citySelectSlice";

const store = configureStore({
    reducer: {
        ui: popupSlice,
    }
})

export default store
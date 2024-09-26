import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../Slice/authSlice";
import { crudSlice } from "../Slice/crudSlice";
export const store = configureStore({
    reducer:{
        Auth: authSlice.reducer,
        Crud: crudSlice.reducer
    }
})
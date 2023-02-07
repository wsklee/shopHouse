import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import toastReducer from "./toastSlice";
import { apiSlice } from "../api/apiSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

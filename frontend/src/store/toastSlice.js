import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    createToast: (state, actions) => {
      const { type, heading, description, dismissalTime } = actions.payload;
      let newToast = {
        id: Date.now(),
        type: type,
        heading: heading ? heading : "shopHouse",
        description: description,
        dismissalTime: dismissalTime ? dismissalTime : 3000,
      };
      state.toasts = [...state.toasts, newToast];
    },
    deleteToast: (state, actions) => {
      const id = actions.payload;
      state.toasts = state.toasts.filter((toast) => toast.id !== id);
    },
  },
});

export const { createToast, deleteToast } = toastSlice.actions;
export const selectToast = (state) => state.toast;

export default toastSlice.reducer;

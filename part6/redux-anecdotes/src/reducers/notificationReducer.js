
import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload;
      state = message;
      return state
    },
  }
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

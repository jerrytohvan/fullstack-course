
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

export const addNewNotification = (message, time = 5) => {
  return dispatch => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, time * 1000);
  }
}
export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    status: null,
    title: '',
    message: '',
  },
  reducers: {
    showNotification(state, action) {
      const { payload } = action;
      state.status = payload.status;
      state.title = payload.title;
      state.message = payload.message;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
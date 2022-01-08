import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    signUpEmailStatus: 'initial',
    signUpEmailStatusTitle: '',
    signUpEmailStatusMessage: '',
  },
  reducers: {
    showNotification(state, action) {
      const { payload } = action;
      state.signUpEmailStatus = payload.signUpEmailStatus;
      state.signUpEmailStatusTitle = payload.signUpEmailStatusTitle;
      state.signUpEmailStatusMessage = payload.signUpEmailStatusMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
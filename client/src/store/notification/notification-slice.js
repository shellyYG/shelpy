import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    signUpEmailStatus: 'initial',
    signUpEmailStatusTitle: '',
    signUpEmailStatusMessage: '',
    signUpPasswordStatus: 'initial',
    signUpPasswordTitle: '',
    signUpPasswordMessage: '',
  },
  reducers: {
    setNotification(state, action) {
      const {
        signUpEmailStatus,
        signUpEmailStatusTitle,
        signUpEmailStatusMessage,
        signUpPasswordStatus,
        signUpPasswordTitle,
        signUpPasswordMessage,
      } = action.payload;
      if (signUpEmailStatus) state.signUpEmailStatus = signUpEmailStatus;
      if (signUpEmailStatusTitle) state.signUpEmailStatusTitle = signUpEmailStatusTitle;
      if (signUpEmailStatusMessage) state.signUpEmailStatusMessage = signUpEmailStatusMessage;
      if (signUpPasswordStatus) state.signUpPasswordStatus = signUpPasswordStatus;
      if (signUpPasswordTitle) state.signUpPasswordTitle = signUpPasswordTitle;
      if (signUpPasswordMessage) state.signUpPasswordMessage = signUpPasswordMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
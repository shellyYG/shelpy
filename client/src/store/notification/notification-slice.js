import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    signUpEmailStatus: 'initial',
    signUpEmailStatusTitle: '',
    signUpEmailStatusMessage: '',
    signUpPasswordStatus: 'initial',
    signUpPasswordStatusTitle: '',
    signUpPasswordStatusMessage: '',
  },
  reducers: {
    setNotification(state, action) {
      const {
        signUpEmailStatus,
        signUpEmailStatusTitle,
        signUpEmailStatusMessage,
        signUpPasswordStatus,
        signUpPasswordStatusTitle,
        signUpPasswordStatusMessage,
      } = action.payload;
      if (signUpEmailStatus) state.signUpEmailStatus = signUpEmailStatus;
      if (signUpEmailStatusTitle) state.signUpEmailStatusTitle = signUpEmailStatusTitle;
      if (signUpEmailStatusMessage) state.signUpEmailStatusMessage = signUpEmailStatusMessage;
      if (signUpPasswordStatus) state.signUpPasswordStatus = signUpPasswordStatus;
      if (signUpPasswordStatusTitle)
        state.signUpPasswordStatusTitle = signUpPasswordStatusTitle;
      if (signUpPasswordStatusMessage)
        state.signUpPasswordStatusMessage = signUpPasswordStatusMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
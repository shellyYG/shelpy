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
    signInStatus: 'initial',
    signInStatusTitle: '',
    signInStatusMessage: '',
    helpeeFormStatus: 'initial',
    helpeeFormStatusTitle: '',
    helpeeFormStatusMessage: '',
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
        signInStatus,
        signInStatusTitle,
        signInStatusMessage,
        helpeeFormStatus,
        helpeeFormStatusTitle,
        helpeeFormStatusMessage,
      } = action.payload;
      if (signUpEmailStatus) state.signUpEmailStatus = signUpEmailStatus;
      if (signUpEmailStatusTitle)
        state.signUpEmailStatusTitle = signUpEmailStatusTitle;
      if (signUpEmailStatusMessage)
        state.signUpEmailStatusMessage = signUpEmailStatusMessage;
      if (signUpPasswordStatus)
        state.signUpPasswordStatus = signUpPasswordStatus;
      if (signUpPasswordStatusTitle)
        state.signUpPasswordStatusTitle = signUpPasswordStatusTitle;
      if (signUpPasswordStatusMessage)
        state.signUpPasswordStatusMessage = signUpPasswordStatusMessage;
      if (signInStatus) state.signInStatus = signInStatus;
      if (signInStatusTitle) state.signInStatusTitle = signInStatusTitle;
      if (signInStatusMessage) state.signInStatusMessage = signInStatusMessage;
      if (helpeeFormStatus) state.helpeeFormStatus = helpeeFormStatus;
      if (helpeeFormStatusTitle)
        state.helpeeFormStatusTitle = helpeeFormStatusTitle;
      if (helpeeFormStatusMessage)
        state.helpeeFormStatusMessage = helpeeFormStatusMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
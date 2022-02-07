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
    requestFormStatus: 'initial',
    requestFormStatusTitle: '',
    requestFormStatusMessage: '',

    applyHelpeeStatus: 'initial',
    applyHelpeeStatusTitle: '',
    applyHelpeeStatusMessage: '',

    requestStatus: 'initial',
    requestStatusTitle: '',
    requestStatusMessage: '',
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
        requestFormStatus,
        requestFormStatusTitle,
        requestFormStatusMessage,

        applyHelpeeStatus,
        applyHelpeeStatusTitle,
        applyHelpeeStatusMessage,

        requestStatus,
        requestStatusTitle,
        requestStatusMessage,
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
      if (requestFormStatus) state.requestFormStatus = requestFormStatus;
      if (requestFormStatusTitle)
        state.requestFormStatusTitle = requestFormStatusTitle;
      if (requestFormStatusMessage)
        state.requestFormStatusMessage = requestFormStatusMessage;
      
      if (applyHelpeeStatus) state.applyHelpeeStatus = applyHelpeeStatus;
      if (applyHelpeeStatusTitle) state.applyHelpeeStatusTitle = applyHelpeeStatusTitle;
      if (applyHelpeeStatusMessage) state.applyHelpeeStatusMessage = applyHelpeeStatusMessage;
      
      if (requestStatus) state.requestStatus = requestStatus;
      if (requestStatusTitle) state.requestStatusTitle = requestStatusTitle;
      if (requestStatusMessage)
        state.requestStatusMessage = requestStatusMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
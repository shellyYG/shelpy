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

    applyHelperStatus: 'initial',
    applyHelperStatusTitle: '',
    applyHelperStatusMessage: '',

    offerStatus: 'initial',
    offerStatusTitle: '',
    offerStatusMessage: '',

    confirmHelperEmailStatus: '',
    confirmHelperEmailStatusTitle: '',
    confirmHelperEmailStatusMessage: '',

    confirmHelperCanChangePasswordStatus: '',
    confirmHelperCanChangePasswordStatusTitle: '',
    confirmHelperCanChangePasswordStatusMessage: ''
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
        applyHelperStatus,
        applyHelperStatusTitle,
        applyHelperStatusMessage,
        offerStatus,
        offerStatusTitle,
        offerStatusMessage,

        confirmHelperEmailStatus,
        confirmHelperEmailStatusTitle,
        confirmHelperEmailStatusMessage,

        confirmHelperCanChangePasswordStatus,
        confirmHelperCanChangePasswordStatusTitle,
        confirmHelperCanChangePasswordStatusMessage,
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
      if (applyHelperStatus) state.applyHelperStatus = applyHelperStatus;
      if (applyHelperStatusTitle)
        state.applyHelperStatusTitle = applyHelperStatusTitle;
      if (applyHelperStatusMessage)
        state.applyHelperStatusMessage = applyHelperStatusMessage;
      if (offerStatus) state.offerStatus = offerStatus;
      if (offerStatusTitle) state.offerStatusTitle = offerStatusTitle;
      if (offerStatusMessage) state.offerStatusMessage = offerStatusMessage;
      if (confirmHelperEmailStatus)
        state.confirmHelperEmailStatus = confirmHelperEmailStatus;
      if (confirmHelperEmailStatusTitle)
        state.confirmHelperEmailStatusTitle = confirmHelperEmailStatusTitle;
      if (confirmHelperEmailStatusMessage)
        state.confirmHelperEmailStatusMessage = confirmHelperEmailStatusMessage;
      if (confirmHelperCanChangePasswordStatus) 
      state.confirmHelperCanChangePasswordStatus =
        confirmHelperCanChangePasswordStatus;
      if (confirmHelperCanChangePasswordStatusTitle)
        state.confirmHelperCanChangePasswordStatusTitle =
          confirmHelperCanChangePasswordStatusTitle;
      if (confirmHelperCanChangePasswordStatusMessage)
        state.confirmHelperCanChangePasswordStatusMessage =
          confirmHelperCanChangePasswordStatusMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;

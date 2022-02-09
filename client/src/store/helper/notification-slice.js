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
      if (offerStatus) 
        state.offerStatus = offerStatus;
      if (offerStatusTitle)
        state.offerStatusTitle = offerStatusTitle;
      if (offerStatusMessage)
        state.offerStatusMessage = offerStatusMessage;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
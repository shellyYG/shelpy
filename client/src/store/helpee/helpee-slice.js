import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: 'helpee',
  initialState: {
    helpeeUserId: 0,
    helpeeName: '',
    isHelpeeAuthenticated: false,
    pageFirstTimeLoaded: true,
    DBHelpeeEmail: '',
    helpeeAccountStatus: '',

    DBHelpeePassword: '',
    DBSignUpStatus: '',
    globalServiceType: '',
    globalNavigateTarget: '',
    globalActiveRequest: '',
    DBRequestId: 0,

    globalHelpeeJobOrUniTarget: '',

    helpeeProfilePicPath: '',
    allOrders: [],
    allPotentialHelpers: [],
    allBookings: [],

    sendPasswordResetEmailStatus: '',
    sendPasswordResetEmailStatusTitle: '',
    sendPasswordResetEmailStatusMessage: '',

    helpeePasswordResetStatus: '',
    helpeePasswordResetStatusTitle: '',
    helpeePasswordResetStatusMessage: '',

    helpeeDashboardTarget: '',

    payHelperStatus: 'initial',
    payHelperStatusTitle: '',
    payHelperStatusMessage: '',

    allChattedHelpers: [],
  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isHelpeeAuthenticated = payload.isHelpeeAuthenticated;
      state.helpeeUserId = payload.helpeeUserId;
      state.helpeeName = payload.helpeeName;
    },
    updateActiveAndPastOrders(state, action) {
      const { payload } = action;
      state.allOrders = payload.allOrders;
    },
    updateAllBookings(state, action) {
      const { payload } = action;
      state.allBookings = payload.allBookings;
    },
    updateHelpeeInfoAfterInsertEmail(state, action) {
      const { payload } = action;
      state.DBHelpeeEmail = payload.email;
    },
    updateHelpeeInfoAfterInsertPassword(state, action) {
      const { payload } = action;
      state.DBHelpeePassword = payload.password;
    },
    updateHelpeeInfoAfterSignIn(state, action) {
      console.log('updateHelpeeInfoAfterSignIn...');
      const { payload } = action;
      console.log('updateHelpeeInfoAfterSignIn: ', payload);
      state.DBHelpeeEmail = payload.email;
      state.helpeeAccountStatus = payload.helpeeAccountStatus;
    },
    updateProfilePicPath(state, action) {
      const { payload } = action;
      state.helpeeProfilePicPath = payload.helpeeProfilePicPath;
    },
    updateHelpeeRequestFormData(state, action) {
      const { payload } = action;
      const { requestId } = payload.data;
      state.DBRequestId = requestId;
      // TODO
      // state.serviceType = payload.serviceType;
    },
    updatePayHelperStatus(state, action) {
      const { payload } = action;
      state.payHelperStatus = payload.payHelperStatus;
      state.payHelperStatusTitle = payload.payHelperStatusTitle;
      state.payHelperStatusMessage = payload.payHelperStatusMessage;
    },
    clearPayHelperStatus(state, action) {
      const { payload } = action;
      state.payHelperStatus = payload.payHelperStatus;
      state.payHelperStatusTitle = payload.payHelperStatusTitle;
      state.payHelperStatusMessage = payload.payHelperStatusMessage;
    },
    onClickUpdateHelpeeActiveServiceType(state, action) {
      const { payload } = action;
      state.globalHelpeeServiceType = payload.globalHelpeeServiceType;
    },
    onClickUpdateActiveSelectedHelper(state, action) {
      const { payload } = action;
      state.selectedHelper = payload.selectedHelper;
    },
    onClickUpdateActiveNavigateTarget(state, action) {
      const { payload } = action;
      state.globalNavigateTarget = payload.globalNavigateTarget;
    },
    onClickUpdateActiveRequest(state, action) {
      const { payload } = action;
      state.globalActiveRequest = payload.globalActiveRequest;
    },
    onClickUpdateHelpeeDashboardTarget(state, action) {
      const { payload } = action;
      state.helpeeDashboardTarget = payload.helpeeDashboardTarget;
    },
    onClickUpdateActiveHelperLists(state, action) {
      const { payload } = action;
      state.globalActiveHelperLists = payload.globalActiveHelperLists;
    },
    onClickUpdateHelpeeActiveJobOrUniTarget(state, action) {
      const { payload } = action;
      state.globalHelpeeJobOrUniTarget = payload.globalHelpeeJobOrUniTarget;
    },

    updateAllPotentialHelpers(state, action) {
      const { payload } = action;
      state.allPotentialHelpers = payload.allPotentialHelpers;
    },
    updateAllOrders(state, action) {
      const { payload } = action;
      state.allOrders = payload.allOrders;
    },
    setSendPasswordResetEmailStatus(state, action) {
      const { payload } = action;
      state.sendPasswordResetEmailStatus = payload.sendPasswordResetEmailStatus;
      state.sendPasswordResetEmailStatusTitle =
        payload.sendPasswordResetEmailStatusTitle;
      state.sendPasswordResetEmailStatusMessage =
        payload.sendPasswordResetEmailStatusMessage;
    },
    updateHelpeeResetPasswordStatus(state, action) {
      const { payload } = action;
      state.helpeePasswordResetStatus = payload.helpeePasswordResetStatus;
      state.helpeePasswordResetStatusTitle =
        payload.helpeePasswordResetStatusTitle;
      state.helpeePasswordResetStatusMessage =
        payload.helpeePasswordResetStatusMessage;
    },
    updateChattedHelpers(state, action) {
      const { payload } = action;
      state.allChattedHelpers = payload.allChattedHelpers;
    },
  },
});

export const helpeeActions = helpeeSlice.actions; // actions === reducers

export default helpeeSlice;
import { createSlice } from '@reduxjs/toolkit';

const helperSlice = createSlice({
  name: 'helper',
  initialState: {
    helperUserId: 0,
    helperName: '',
    isHelperAuthenticated: false,

    pageFirstTimeLoaded: true,
    DBHelperEmail: '',
    DBHelperPassword: '',

    helperAccountStatus: '',
    DBSignUpStatus: '',
    globalServiceType: '',
    globalNavigateTarget: '',
    globalActiveRequest: '',
    DBRequestId: 0,
    allOrders: [],

    globalHelperJobOrUniTarget: '',

    helperProfilePicPath: '',
    offerTarget: '',
    allOffers: [],
    allPotentialCustomers: [],

    sendPasswordResetEmailStatus: '',
    sendPasswordResetEmailStatusTitle: '',
    sendPasswordResetEmailStatusMessage: '',

    helperPasswordResetStatus: '',
    helperPasswordResetStatusTitle: '',
    helperPasswordResetStatusMessage: '',
  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isHelperAuthenticated = payload.isHelperAuthenticated;
      state.helperUserId = payload.helperUserId;
      state.helperName = payload.username;
    },
    updateActiveAndPastOrders(state, action) {
      const { payload } = action;
      state.allOrders = payload.allOrders;
    },
    updateHelperInfoAfterInsertEmail(state, action) {
      const { payload } = action;
      state.DBHelperEmail = payload.email;
    },
    updateHelperInfoAfterInsertPassword(state, action) {
      const { payload } = action;
      state.DBHelperPassword = payload.password;
    },
    updateHelperInfoAfterSignIn(state, action) {
      const { payload } = action;
      state.DBHelperEmail = payload.email;
      state.helperAccountStatus = payload.helperAccountStatus;
    },
    onClickUpdateActiveOfferTarget(state, action) {
      const { payload } = action;
      state.offerTarget = payload.offerTarget;
    },
    onClickUpdateActiveHelperLists(state, action) {
      const { payload } = action;
      state.globalActiveHelperLists = payload.globalActiveHelperLists;
    },
    onClickUpdateHelperActiveJobOrUniTarget(state, action) {
      const { payload } = action;
      state.globalHelperJobOrUniTarget = payload.globalHelperJobOrUniTarget;
    },
    updateProfilePicPath(state, action) {
      const { payload } = action;
      state.helperProfilePicPath = payload.helperProfilePicPath;
    },
    updateAllOffers(state, action) {
      const { payload } = action;
      state.allOffers = payload.allOffers;
    },
    updateAllPotentialCustomers(state, action) {
      const { payload } = action;
      state.allPotentialCustomers = payload.allPotentialCustomers;
    },
    setSendPasswordResetEmailStatus(state, action) {
      const { payload } = action;
      state.sendPasswordResetEmailStatus = payload.sendPasswordResetEmailStatus;
      state.sendPasswordResetEmailStatusTitle =
        payload.sendPasswordResetEmailStatusTitle;
      state.sendPasswordResetEmailStatusMessage =
        payload.sendPasswordResetEmailStatusMessage;
    },
    updateHelperResetPasswordStatus(state, action) {
      const { payload } = action;
      state.helperPasswordResetStatus = payload.helperPasswordResetStatus;
      state.helperPasswordResetStatusTitle =
        payload.helperPasswordResetStatusTitle;
      state.helperPasswordResetStatusMessage =
        payload.helperPasswordResetStatusMessage;
    },
  },
});

export const helperActions = helperSlice.actions;

export default helperSlice;

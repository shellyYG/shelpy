import { createSlice } from '@reduxjs/toolkit';

const helperSlice = createSlice({
  name: 'helper',
  initialState: {
    helperUserId: 0,
    helperName: '',
    helperStatus: '',
    isHelperAuthenticated: false,

    pageFirstTimeLoaded: true,
    DBHelperEmail: '',
    DBHelperPassword: '',

    helperDashboardTarget: '',

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
    allBookings: [],

    sendPasswordResetEmailStatus: '',
    sendPasswordResetEmailStatusTitle: '',
    sendPasswordResetEmailStatusMessage: '',

    helperPasswordResetStatus: '',
    helperPasswordResetStatusTitle: '',
    helperPasswordResetStatusMessage: '',

    deleteOfferStatus: 'initial',
    deleteOfferStatusTitle: '',
    deleteOfferStatusMessage: '',

    setPayPalAccountStatus: 'initial',
    setPayPalAccountStatusTitle: '',
    setPayPalAccountStatusMessage: '',

    allChattedCustomers: [],
    helperData: [],
  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isHelperAuthenticated = payload.isHelperAuthenticated;
      state.helperUserId = payload.helperUserId;
      state.helperName = payload.helperName;
      state.helperStatus = payload.helperStatus;
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
    onClickUpdateHelperDashboardTarget(state, action) {
      const { payload } = action;
      state.helperDashboardTarget = payload.helperDashboardTarget;
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
    updateAllBookings(state, action) {
      const { payload } = action;
      state.allBookings = payload.allBookings;
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
    updateAllChattedCustomers(state, action) {
      const { payload } = action;
      state.allChattedCustomers = payload.allChattedCustomers;
    },
    setDeleteOfferStatus(state, action) {
      const { payload } = action;
      state.deleteOfferStatus = payload.deleteOfferStatus;
      state.deleteOfferStatusTitle = payload.deleteOfferStatusTitle;
      state.deleteOfferStatusMessage = payload.deleteOfferStatusMessage;
    },
    clearDeleteOfferStatus(state, action) {
      const { payload } = action;
      state.deleteOfferStatus = payload.deleteOfferStatus;
      state.deleteOfferStatusTitle = payload.deleteOfferStatusTitle;
      state.deleteOfferStatusMessage = payload.deleteOfferStatusMessage;
    },
    setUpdatePayPalAccountStatus(state, action) {
      const { payload } = action;
      state.setPayPalAccountStatus = payload.setPayPalAccountStatus;
      state.setPayPalAccountStatusTitle = payload.setPayPalAccountStatusTitle;
      state.setPayPalAccountStatusMessage =
        payload.setPayPalAccountStatusMessage;
    },
    clearSetPayPalAccountStatus(state, action) {
      const { payload } = action;
      state.setPayPalAccountStatus = payload.setPayPalAccountStatus;
      state.setPayPalAccountStatusTitle = payload.setPayPalAccountStatusTitle;
      state.setPayPalAccountStatusMessage =
        payload.setPayPalAccountStatusMessage;
    },
    updateHelperData(state, action) {
      const { payload } = action;
      state.helperData = payload.helperData;
    },
  },
});

export const helperActions = helperSlice.actions;

export default helperSlice;

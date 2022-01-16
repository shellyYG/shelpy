import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: 'helpee',
  initialState: {
    userId: 0,
    isAuthenticated: false,
    pageFirstTimeLoaded: true,
    DBHelpeeEmail: '',
    DBHelpeePassword: '',
    DBSignUpStatus: '',
    globalServiceType: '',
    globalNavigateTarget: '',
    globalActiveRequest: '',
    DBRequestId: 0,
    activeOrders: [],
    completeOrders: [],
  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isAuthenticated = payload.isAuthenticated;
      state.userId = payload.userId;
    },
    updateActiveAndCompleteOrders(state, action) {
      const { payload } = action;
      state.activeOrders = payload.activeOrders;
      state.completeOrders = payload.completeOrders;
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
      const { payload } = action;
      state.DBHelpeeEmail = payload.email;
    },
    updateHelpeeRequestFormData(state, action) {
      const { payload } = action;
      const { requestId } = payload.data;
      state.DBRequestId = requestId;
      // TODO
      // state.serviceType = payload.serviceType;
    },
    onClickUpdateActiveServiceType(state, action) {
      const { payload } = action;
      state.globalServiceType = payload.globalServiceType;
    },
    onClickUpdateActiveNavigateTarget(state, action) {
      const { payload } = action;
      state.globalNavigateTarget = payload.globalNavigateTarget;
    },
    onClickUpdateActiveRequest(state, action) {
      const { payload } = action;
      state.globalActiveRequest = payload.globalActiveRequest;
    },
    onClickUpdateActiveHelperLists(state, action) {
      const { payload } = action;
      state.globalActiveHelperLists = payload.globalActiveHelperLists;
    },
  },
});

export const helpeeActions = helpeeSlice.actions; // 其實 actions 就是 reducers 啦

export default helpeeSlice;
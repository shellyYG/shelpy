import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: "helpee",
  initialState: {
    pageFirstTimeLoaded: true,
    DBHelpeeEmail: "",
    DBSignUpStatus: "",
    globalServiceType: "",
    globalNavigateTarget: "",
    globalActiveRequest: "",
  },
  reducers: {
    updateHelpeeInfoAfterInsertEmail(state, action) {
      const { payload } = action;
      state.pageFirstTimeLoaded = false;
      state.DBHelpeeemail = payload.email;
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
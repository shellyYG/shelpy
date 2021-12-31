import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: "helpeeAccount",
  initialState: {
    pageFirstTimeLoaded: true,
    DBHelpeeEmail: "",
    DBSignUpStatus: "",
    globalServiceType: "",
    globalNavigateTarget: "",
  },
  reducers: {
    updateHelpeeInfoAfterInsertEmail(state, action) {
      const { payload } = action;
      state.pageFirstTimeLoaded = false;
      state.DBemail = payload.helpeeEmail;
    },
    onClickUpdateActiveServiceType(state, action) {
      const { payload } = action;
      state.globalServiceType = payload.globalServiceType;
    },
    onClickUpdateActiveNavigateTarget(state, action) {
      const { payload } = action;
      state.globalNavigateTarget = payload.globalNavigateTarget;
    },
  },
});

export const helpeeActions = helpeeSlice.actions; // 其實 actions 就是 reducers 啦

export default helpeeSlice;
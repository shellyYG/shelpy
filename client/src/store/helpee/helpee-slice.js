import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: 'helpeeAccount',
  initialState: {
    pageFirstTimeLoaded: true,
    DBHelpeeEmail: '',
    DBSignUpStatus: '',
  },
  reducers: {
    updateHelpeeInfoAfterInsertEmail(state, action) {
      const { payload } = action;
      state.pageFirstTimeLoaded = false;
      state.DBemail = payload.helpeeEmail;
    },
  },
});

export const helpeeActions = helpeeSlice.actions; // 其實 actions 就是 reducers 啦

export default helpeeSlice;
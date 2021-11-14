import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: 'helpee',
  initialState: {
    pageFirstTimeLoaded: true,
    activeServiceType: '',
    DBHelpeeName: '',
    DBHelpeeLanguage: '',
    DBServiceType: '',
  },
  reducers: {
    replaceHelpeeInfo(state, action) {
      // const { payload } = action;
      // console.log('payload: ', payload);
      // state.pageFirstTimeLoaded = true; // stays true
      // state.DBHelpeeName = payload.helpeeName;
      // state.DBHelpeeLanguage = payload.helpeeLanguage;
      state.DBServiceType = 'hihi'; //payload.serviceType;
    },
    updateHelpeeInfoAfterUserInput(state, action) {
      const { payload } = action;
      state.pageFirstTimeLoaded = false;
      state.DBHelpeeName = payload.helpeeName;
      state.DBHelpeeLanguage = payload.helpeeLanguage;
      state.DBServiceType = payload.serviceType;
    },
    setActiveServiceType(state,action) {
      state.activeServiceType = action.payload.activeServiceType;
    }
  },
});

export const helpeeActions = helpeeSlice.actions; // 其實 actions 就是 reducers 啦

export default helpeeSlice;
import { createSlice } from '@reduxjs/toolkit';

const helperSlice = createSlice({
  name: 'helper',
  initialState: {
    userId: 0,
    isAuthenticated: false,
    pageFirstTimeLoaded: true,
    DBHelperEmail: '',
    DBHelperPassword: '',
    DBSignUpStatus: '',
    globalServiceType: '',
    globalNavigateTarget: '',
    globalActiveRequest: '',
    DBRequestId: 0,
    allOrders: [],

    globalJobOrUniTarget: '',

    globalUniSchool: '',
    globalUniDepartment: '',
    globalUniCountry: '',
    globalUniDegree: '',
    globalUniNotes: '',

    globalJobIndustry: '',
    globalJobJob: '',
    globalJobCountry: '',
    globalJobWFH: '',
    globalJobCompanySize: '',
    globalJobYears: '',
    globalJobNotes: '',

    globalSelfEmployedType: '',
    globalSelfEmployedProfession: '',
    globalSelfEmployedCountry: '',
    globalSelfEmployedYears: '',
    globalSelfEmployedNotes: '',

    profilePicPath: '',
  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isAuthenticated = payload.isAuthenticated;
      state.userId = payload.userId;
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
    },
    updateHelperRequestFormData(state, action) {
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
    onClickUpdateActiveJobOrUniTarget(state, action) {
      const { payload } = action;
      state.globalJobOrUniTarget = payload.globalJobOrUniTarget;
    },
    onSubmitUpdateUniData(state, action) {
      const { payload } = action;
      state.globalUniSchool = payload.school;
      state.globalUniDepartment = payload.department;
      state.globalUniCountry = payload.country;
      state.globalJobWFH = payload.WFH;
      state.globalUniDegree = payload.degree;
      state.globalUniNotes = payload.notes;
    },
    onSubmitUpdateJobData(state, action) {
      const { payload } = action;
      state.globalJobIndustry = payload.industry;
      state.globalJobJob = payload.job;
      state.globalJobCountry = payload.country;
      state.globalJobWFH = payload.WFH;
      state.globalJobCompanySize = payload.companySize;
      state.globalJobYears = payload.years;
      state.globalJobNotes = payload.notes;
    },
    onSubmitUpdateSelfEmployedData(state, action) {
      const { payload } = action;
      state.globalSelfEmployedType = payload.type;
      state.globalSelfEmployedProfession = payload.profession;
      state.globalSelfEmployedCountry = payload.country;
      state.globalSelfEmployedYears = payload.years;
      state.globalSelfEmployedNotes = payload.notes;
    },
    updateProfilePicPath(state, action) {
      console.log('helper slice updateProfilePic...');
      const { payload } = action;
      state.profilePicPath = payload.profilePicPath;
    },
  },
});

export const helperActions = helperSlice.actions;

export default helperSlice;

import { createSlice } from '@reduxjs/toolkit';

const helpeeSlice = createSlice({
  name: 'helpee',
  initialState: {
    helpeeUserId: 0,
    isHelpeeAuthenticated: false,
    pageFirstTimeLoaded: true,
    DBHelpeeEmail: '',
    DBHelpeePassword: '',
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

  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isHelpeeAuthenticated = payload.isHelpeeAuthenticated;
      state.helpeeUserId = payload.helpeeUserId;
    },
    updateActiveAndPastOrders(state, action) {
      const { payload } = action;
      state.allOrders = payload.allOrders;
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
  },
});

export const helpeeActions = helpeeSlice.actions; // 其實 actions 就是 reducers 啦

export default helpeeSlice;
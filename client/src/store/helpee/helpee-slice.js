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

    globalHelpeeJobOrUniTarget: '',

    globalHelpeeUniSchool: '',
    globalHelpeeUniDepartment: '',
    globalHelpeeUniCountry: '',
    globalHelpeeUniDegree: '',
    globalHelpeeUniNotes: '',

    globalHelpeeJobIndustry: '',
    globalHelpeeJobJob: '',
    globalHelpeeJobCountry: '',
    globalHelpeeJobWFH: '',
    globalHelpeeJobCompanySize: '',
    globalHelpeeJobYears: '',
    globalHelpeeJobNotes: '',

    globalHelpeeSelfEmployedType: '',
    globalHelpeeSelfEmployedProfession: '',
    globalHelpeeSelfEmployedCountry: '',
    globalHelpeeSelfEmployedYears: '',
    globalHelpeeSelfEmployedNotes: '',
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
    onClickUpdateActiveHelperLists(state, action) {
      const { payload } = action;
      state.globalActiveHelperLists = payload.globalActiveHelperLists;
    },
    onClickUpdateHelpeeActiveJobOrUniTarget(state, action) {
      const { payload } = action;
      state.globalHelpeeJobOrUniTarget = payload.globalHelpeeJobOrUniTarget;
    },
    onSubmitUpdateHelpeeUniData(state, action) {
      const { payload } = action;
      state.globalHelpeeUniSchool = payload.school;
      state.globalHelpeeUniDepartment = payload.department;
      state.globalHelpeeUniCountry = payload.country;
      state.globalHelpeeJobWFH = payload.WFH;
      state.globalHelpeeUniDegree = payload.degree;
      state.globalHelpeeUniNotes = payload.notes;
    },
    onSubmitUpdateHelpeeJobData(state, action) {
      const { payload } = action;
      state.globalHelpeeJobIndustry = payload.industry;
      state.globalHelpeeJobJob = payload.job;
      state.globalHelpeeJobCountry = payload.country;
      state.globalHelpeeJobWFH = payload.WFH;
      state.globalHelpeeJobCompanySize = payload.companySize;
      state.globalHelpeeJobYears = payload.years;
      state.globalJobNotes = payload.notes;
    },
    onSubmitUpdateHelpeeSelfEmployedData(state, action) {
      const { payload } = action;
      state.globalHelpeeSelfEmployedType = payload.type;
      state.globalHelpeeSelfEmployedProfession = payload.profession;
      state.globalHelpeeSelfEmployedCountry = payload.country;
      state.globalHelpeeSelfEmployedYears = payload.years;
      state.globalHelpeeSelfEmployedNotes = payload.notes;
    },
  },
});

export const helpeeActions = helpeeSlice.actions; // 其實 actions 就是 reducers 啦

export default helpeeSlice;
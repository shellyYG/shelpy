import { createSlice } from '@reduxjs/toolkit';

const helperSlice = createSlice({
  name: 'helper',
  initialState: {
    helperUserId: 0,
    isHelpeeAuthenticated: false,
    pageFirstTimeLoaded: true,
    DBHelperEmail: '',
    DBHelperPassword: '',
    DBSignUpStatus: '',
    globalServiceType: '',
    globalNavigateTarget: '',
    globalActiveRequest: '',
    DBRequestId: 0,
    allOrders: [],

    globalHelperJobOrUniTarget: '',

    globalHelperUniSchool: '',
    globalHelperUniDepartment: '',
    globalHelperUniCountry: '',
    globalHelperUniDegree: '',
    globalHelperUniNotes: '',

    globalHelperJobIndustry: '',
    globalHelperJobJob: '',
    globalHelperJobCountry: '',
    globalHelperJobWFH: '',
    globalHelperJobCompanySize: '',
    globalHelperJobYears: '',
    globalHelperJobNotes: '',

    globalHelperSelfEmployedType: '',
    globalHelperSelfEmployedProfession: '',
    globalHelpeeSelfEmployedCountry: '',
    globalHelperSelfEmployedYears: '',
    globalHelperSelfEmployedNotes: '',

    helperProfilePicPath: '',
    offerTarget: '',
    allOffers: [],
    allPotentialCustomers: [],
  },
  reducers: {
    updateAuthStatus(state, action) {
      const { payload } = action;
      state.isHelperAuthenticated = payload.isHelperAuthenticated;
      state.helperUserId = payload.helperUserId;
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
    onSubmitUpdateHelperUniData(state, action) {
      const { payload } = action;
      state.globalHelperUniSchool = payload.school;
      state.globalHelperUniDepartment = payload.department;
      state.globalHelperUniCountry = payload.country;
      state.globalHelperJobWFH = payload.WFH;
      state.globalHelperUniDegree = payload.degree;
      state.globalHelperUniNotes = payload.notes;
    },
    onSubmitUpdateHelperJobData(state, action) {
      const { payload } = action;
      state.globalHelperJobIndustry = payload.industry;
      state.globalHelperJobJob = payload.job;
      state.globalHelperJobCountry = payload.country;
      state.globalHelperJobWFH = payload.WFH;
      state.globalHelperJobCompanySize = payload.companySize;
      state.globalHelperJobYears = payload.years;
      state.globalHelperJobNotes = payload.notes;
    },
    onSubmitUpdateHelperSelfEmployedData(state, action) {
      const { payload } = action;
      state.globalHelperSelfEmployedType = payload.type;
      state.globalHelperSelfEmployedProfession = payload.profession;
      state.globalHelperSelfEmployedCountry = payload.country;
      state.globalHelperSelfEmployedYears = payload.years;
      state.globalHelperSelfEmployedNotes = payload.notes;
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
  },
});

export const helperActions = helperSlice.actions;

export default helperSlice;

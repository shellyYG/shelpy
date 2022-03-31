import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'booking',
  initialState: {
    targetChatroomId: '',
    dropDownNavTarget: '',
    bookingStatus: '',
    bookingDate: '',
    bookingTime: '',
    bookingNotes: '',

    bookingNotificationStatus: 'Initial',
    bookingNotificationStatusTitle: '',
    bookingNotificationStatusMessage: '',

    unSubEmailStatus: 'Initial',
    unSubEmailStatusTitle: '',
    unSubEmailStatusMessage: '',

    allMKTOffers: [],
    allMKTHelperRatings: [],
    userRole: '',
    signInRole: '',

    confirmCanAccessChatRoomStatus: 'Initial',
    confirmCanAccessChatRoomStatusTitle: '',
    confirmCanAccessChatRoomStatusMessage: '',

    confirmCanAccessDashboardStatus: 'Initial',
    confirmCanAccessDashboardStatusTitle: '',
    confirmCanAccessDashboardStatusMessage: '',

    ratingNotificationStatus: 'Initial',
    ratingNotificationStatusTitle: '',
    ratingNotificationStatusMessage: '',
  },
  reducers: {
    setUserRole(state, action) {
      const { userRole } = action.payload;
      if (userRole) state.userRole = userRole;
    },
    setDropDownNavTarget(state, action) {
      const { dropDownNavTarget } = action.payload;
      if (dropDownNavTarget) state.dropDownNavTarget = dropDownNavTarget;
    },
    setBookingStatus(state, action) {
      const { bookingStatus, bookingDate, bookingTime, bookingNotes } =
        action.payload;
      if (bookingStatus) state.bookingStatus = bookingStatus;
      if (bookingDate) state.bookingDate = bookingDate;
      if (bookingTime) state.bookingTime = bookingTime;
      if (bookingNotes) state.bookingNotes = bookingNotes;
    },
    setBookingNotificationStatus(state, action) {
      const {
        bookingNotificationStatus,
        bookingNotificationStatusTitle,
        bookingNotificationStatusMessage,
      } = action.payload;
      if (bookingNotificationStatus)
        state.bookingNotificationStatus = bookingNotificationStatus;
      if (bookingNotificationStatusTitle)
        state.bookingNotificationStatusTitle = bookingNotificationStatusTitle;
      if (bookingNotificationStatusMessage)
        state.bookingNotificationStatusMessage =
          bookingNotificationStatusMessage;
    },
    onClickUpdateChatroomRoom(state, action) {
      const { targetChatroomId } = action.payload;
      if (targetChatroomId) state.targetChatroomId = targetChatroomId;
    },
    onClickUpdateSignInRole(state, action) {
      const { signInRole } = action.payload;
      if (signInRole) state.signInRole = signInRole;
    },
    updateAllMarketingOffers(state, action) {
      const { allMKTOffers, allMKTHelperRatings } = action.payload;
      if (allMKTOffers) state.allMKTOffers = allMKTOffers;
      if (allMKTHelperRatings) state.allMKTHelperRatings = allMKTHelperRatings;
    },
    setEmailUnsubStatus(state, action) {
      const {
        unSubEmailStatus,
        unSubEmailStatusTitle,
        unSubEmailStatusMessage,
      } = action.payload;
      if (unSubEmailStatus) state.unSubEmailStatus = unSubEmailStatus;
      if (unSubEmailStatusTitle)
        state.unSubEmailStatusTitle = unSubEmailStatusTitle;
      if (unSubEmailStatusMessage)
        state.unSubEmailStatusMessage = unSubEmailStatusMessage;
    },
    setCanAccessChatroom(state, action) {
      const {
        confirmCanAccessChatRoomStatus,
        confirmCanAccessChatRoomStatusTitle,
        confirmCanAccessChatRoomStatusMessage,
      } = action.payload;
      if (confirmCanAccessChatRoomStatus)
        state.confirmCanAccessChatRoomStatus = confirmCanAccessChatRoomStatus;
      if (confirmCanAccessChatRoomStatusTitle)
        state.confirmCanAccessChatRoomStatusTitle =
          confirmCanAccessChatRoomStatusTitle;
      if (confirmCanAccessChatRoomStatusMessage)
        state.confirmCanAccessChatRoomStatusMessage =
          confirmCanAccessChatRoomStatusMessage;
    },
    setCanAccessDashboard(state, action) {
      const {
        confirmCanAccessDashboardStatus,
        confirmCanAccessDashboardStatusTitle,
        confirmCanAccessDashboardStatusMessage,
      } = action.payload;
      if (confirmCanAccessDashboardStatus)
        state.confirmCanAccessDashboardStatus = confirmCanAccessDashboardStatus;
      if (confirmCanAccessDashboardStatusTitle)
        state.confirmCanAccessDashboardStatusTitle =
          confirmCanAccessDashboardStatusTitle;
      if (confirmCanAccessDashboardStatusMessage)
        state.confirmCanAccessDashboardStatusMessage =
          confirmCanAccessDashboardStatusMessage;
    },
    setPostRatingNotificationStatus(state, action) {
      const {
        ratingNotificationStatus,
        ratingNotificationStatusTitle,
        ratingNotificationStatusMessage,
      } = action.payload;
      if (ratingNotificationStatus)
        state.ratingNotificationStatus = ratingNotificationStatus;
      if (ratingNotificationStatusTitle)
        state.ratingNotificationStatusTitle = ratingNotificationStatusTitle;
      if (ratingNotificationStatusMessage)
        state.ratingNotificationStatusMessage = ratingNotificationStatusMessage;
    },
  },
});

export const generalActions = generalSlice.actions; // actions === reducers

export default generalSlice;

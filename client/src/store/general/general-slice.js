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
  },
  reducers: {
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
    updateAllMarketingOffers(state, action) {
      const { allMKTOffers } = action.payload;
      if (allMKTOffers) state.allMKTOffers = allMKTOffers;
    },
    setEmailUnsubStatus(state, action) {
      const {
        unSubEmailStatus,
        unSubEmailStatusTitle,
        unSubEmailStatusMessage,
      } = action.payload;
      if (unSubEmailStatus) state.unSubEmailStatus = unSubEmailStatus;
      if (unSubEmailStatusTitle) state.unSubEmailStatusTitle = unSubEmailStatusTitle;
      if (unSubEmailStatusMessage) state.unSubEmailStatusMessage = unSubEmailStatusMessage;
    },
  },
});

export const generalActions = generalSlice.actions; // actions === reducers

export default generalSlice;

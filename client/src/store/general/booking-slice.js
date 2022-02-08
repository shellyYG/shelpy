import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookingStatus: '',
    bookingDate: '',
    bookingTime: '',
    bookingNotes: '',
    bookingNotificationStatus: 'Initial',
    bookingNotificationStatusTitle: '',
    bookingNotificationStatusMessage: '',
  },
  reducers: {
    setBookingStatus(state, action) {
      const { bookingStatus, bookingDate, bookingTime, bookingNotes } = action.payload;
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
      if (bookingNotificationStatus) state.bookingNotificationStatus = bookingNotificationStatus;
      if (bookingNotificationStatusTitle)
        state.bookingNotificationStatusTitle = bookingNotificationStatusTitle;
      if (bookingNotificationStatusMessage)
        state.bookingNotificationStatusMessage = bookingNotificationStatusMessage;
    },
  },
});

export const bookingActions = bookingSlice.actions; // actions === reducers

export default bookingSlice;

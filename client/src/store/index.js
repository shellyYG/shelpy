import { configureStore } from '@reduxjs/toolkit';
import helpeeSlice  from './helpee/helpee-slice';
import helperSlice from './helper/helper-slice';
import bookingSlice from './general/booking-slice';
import helpeeNotificationSlice from './helpee/notification-slice';
import helperNotificationSlice from './helper/notification-slice';

const store = configureStore({
  reducer: {
    helpee: helpeeSlice.reducer,
    helper: helperSlice.reducer,
    booking: bookingSlice.reducer,
    helpeeNotification: helpeeNotificationSlice.reducer,
    helperNotification: helperNotificationSlice.reducer,
  },
});

export default store;
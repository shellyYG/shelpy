import { configureStore } from '@reduxjs/toolkit';
import helpeeSlice  from './helpee/helpee-slice';
import helperSlice from './helper/helper-slice'
import notificationSlice from './notification/notification-slice';

const store = configureStore({
    reducer: { 
        helpee: helpeeSlice.reducer,
        helper: helperSlice.reducer,
        notification: notificationSlice.reducer,
    }
})

export default store;
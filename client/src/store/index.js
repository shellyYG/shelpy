import { configureStore } from '@reduxjs/toolkit';
import helpeeSlice  from './helpee/helpee-slice';
import notificationSlice from './notification/notification-slice';

const store = configureStore({
    reducer: { 
        helpee: helpeeSlice.reducer,
        notification: notificationSlice.reducer,
    }
})

export default store;
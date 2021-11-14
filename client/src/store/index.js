import { configureStore } from '@reduxjs/toolkit';
import helpeeSlice  from './helpee/helpee-slice';

const store = configureStore({
    reducer: { helpee: helpeeSlice.reducer }
})

export default store;
import { configureStore } from '@reduxjs/toolkit';
// slice reducers imported
import homepageReducer from '../features/homepageSlice';
import userReducer from '../features/userSlice';
import orgDataReducer from '../features/orgUnitSlice';
import dashboardReducer from '../features/dashboardSlice';
import usersReducer from '../features/usersSlice';
// reducers consolidated in configure store and exported
export default configureStore({
  reducer: {
    homepage: homepageReducer,
    user: userReducer,
    orgData: orgDataReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
  },
});

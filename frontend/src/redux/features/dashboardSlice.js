import { createSlice } from '@reduxjs/toolkit';
// default state declared
const initialState = {
  addComponent: false,
  viewUsers: false,
};
/**
 * dashboardSlice declared
 * state named dashboard
 * reducers:
 * toggleAdd sets the AddComponent state to the opposite when called
 * toggleUsers sets the ViewUsers state to the opposite when called
 */
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleAdd: (state) => {
      state.addComponent = !state.addComponent;
    },
    toggleUsers: (state) => {
      state.viewUsers = !state.viewUsers;
    },
  },
});
// slice actions exported
export const { toggleAdd, toggleUsers } = dashboardSlice.actions;
// export slice reducer
export default dashboardSlice.reducer;

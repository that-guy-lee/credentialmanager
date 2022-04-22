import { createSlice } from '@reduxjs/toolkit';
// initial state declared to be default
const initialState = {
  componentToggle: false,
};
/**
 * homepageSlice
 * handles the state of the homepage that influences functionality
 * reducer:
 * toggleComponent - sets the Boolean state to the opposite of the current value when called
 */
const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    toggleComponent: (state) => {
      state.componentToggle = !state.componentToggle;
    },
  },
});
// action and reducer exported to be used in components and global store
export const { toggleComponent } = homepageSlice.actions;

export default homepageSlice.reducer;

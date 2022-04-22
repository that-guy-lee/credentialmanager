import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// default initial state declared
const initialState = {
  orgUnits: null,
  status: '',
  error: null,
  loggedUser: null,
  actions: 0,
};
/**
 * AsyncThunk getOrgData declared
 * retrieves token from local storage
 * try catch block wraps the fetch request with token header
 * on success the response is parsed from json and assigned to result and returned
 * if failure,
 * the error is caught and returned
 */
export const getOrgData = createAsyncThunk('orgData/getOrgData', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('units/divisions', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
    const result = response.json();
    return result;
  } catch (err) {
    return err;
  }
});
/**
 * orgDataSlice,
 * state is named as orgData
 * reducers:
 * setDefault is used to return the state to default
 * setLoggedUser sets the loggedUser state to the action payload
 * setActions increments the actions state
 * extraReducers builder,
 * handles the differing state of the promise from the getOrgData async thunk
 * whilst pending,
 * status is assigned to loading
 * if fulfilled,
 * status set to success
 * api data is set tom the orgUnits state
 * if rejected,
 * status is set to rejected,
 * error is set to the error returned from the getOrgData
 */
export const orgDataSlice = createSlice({
  name: 'orgData',
  initialState,
  reducers: {
    setDefault: () => initialState,
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    setActions: (state) => {
      state.actions += 1;
    },
  },
  extraReducers: {
    [getOrgData.pending]: (state) => {
      state.status = 'loading';
    },
    [getOrgData.fulfilled]: (state, action) => {
      state.status = 'success';
      state.orgUnits = action.payload;
    },
    [getOrgData.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// slice actions exported
export const { setDefault, setLoggedUser, setActions } = orgDataSlice.actions;
// slice reducer is exported
export default orgDataSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// default initial state declared
const initialState = {
  data: null,
  status: '',
  error: null,
  userActions: 0,
};
/**
 * getUsers AsyncThunk
 * retrieves all the users from the server
 * token retrieved from localStorage
 * request wrapped in try catch block for error handling
 * on success result is parsed and returned
 * if not err is returned
 */
export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('user/all', {
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
 * usersSlice
 * state named users
 * default state is used
 * reducer,
 * setUserActions declared increments the userActions state when called.
 * .pending, .rejected . fulfilled reducers for the getUsers actions declared
 * depending on the state of the promise from the AsyncThunk
 * state is manipulated.
 */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserActions: (state) => {
      state.userActions += 1;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// setUserActions is exported
export const { setUserActions } = usersSlice.actions;
// reducer exported
export default usersSlice.reducer;

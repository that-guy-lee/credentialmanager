import { createSlice } from '@reduxjs/toolkit';
// default initialState declared
const initialState = {
  name: '',
  email: '',
  password: '',
  roles: {},
  permissions: [],
};
/**
 * userSlice
 * created for management of the user information
 * reducers
 * setDefault is used to wipe the user data from the state
 * All other reducers set the state to the value of the action payload,
 * of their corresponding action/ state names.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDefault: () => initialState,
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions.push(action.payload);
    },
    removePermissions: (state, action) => {
      const updatedPermissions = state.permissions.filter(
        (perm) => perm.orgUnit !== action.payload
      );
      console.log(updatedPermissions);
      state.permissions = updatedPermissions;
    },
  },
});
// slice actions exported
export const {
  setDefault,
  setName,
  setEmail,
  setPassword,
  setPermissions,
  removePermissions,
} = userSlice.actions;
// reducer exported for global state
export default userSlice.reducer;

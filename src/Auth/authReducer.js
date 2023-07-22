// authReducer.js

import { createSlice,configureStore } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
    setEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload;
    },
  },
});
const profileSlice = createSlice({
    name: 'profile',
    initialState: { showForm: false, fullName: '', profileUrl: '' },
    reducers: {
      updateProfile: (state, action) => {
        // Update the profile state with the new data
        state.fullName = action.payload.fullName;
        state.profileUrl = action.payload.profileUrl;
      },
      toggleForm: (state) => {
        // Toggle the showForm state
        state.showForm = !state.showForm;
      },
    },
  });
  
  const themeSlice = createSlice({
    name: 'theme',
    initialState:null,
    reducers: {
      toggleTheme:  (state, action) => {
        if (action.payload === 'dark') {
          return 'dark';
        } else {
          return 'light';
        }
      },
    },
  });
  
const store = configureStore({
    reducer: { auth: authSlice.reducer,profile:profileSlice.reducer,theme: themeSlice.reducer,}
  });

export const authActions = authSlice.actions;
export const profileActions = profileSlice.actions;
export const themeActions = themeSlice.actions;

export default store;

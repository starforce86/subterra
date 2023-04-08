import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {},
  dimensions: {
    width: 0,
    height: 0,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
  },
});

/**
 * Export functions
 */
export const { setToken, setUser, setDimensions } = appSlice.actions;

/**
 * Export selectors
 */
export const selectToken = (state: any) => {
  return state.app.token;
};
export const selectUser = (state: any) => {
  return state.app.user;
};
export const selectDimensions = (state: any) => {
  return state.app.dimensions;
};

/**
 * Export reducer
 */
export default appSlice.reducer;

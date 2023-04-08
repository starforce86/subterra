import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

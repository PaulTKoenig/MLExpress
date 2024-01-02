import { configureStore } from '@reduxjs/toolkit';
import uploadedDataReducer from './features/uploaded_data/uploadedDataSlice';
export const store = configureStore({
  reducer: {
    uploadedDataReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
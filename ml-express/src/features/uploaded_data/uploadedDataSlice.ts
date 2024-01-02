import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type UploadedData = any[];

const initialState: UploadedData[] = [];

export const uploadedDataSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadedData: (state, action: PayloadAction<UploadedData[]>) => {
      console.log(action.payload)
      return action.payload; // Create a new state array
    },
  },
});
export const { setUploadedData } = uploadedDataSlice.actions;
export const uploadedDataSelector = (state: RootState) => state.uploadedDataReducer;
export default uploadedDataSlice.reducer;
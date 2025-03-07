import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface UploadedData {
  headers: string[];
  headerTypes: { columnName: string, type: string, numDiffValues: number }[];
  data: any[];
  predictedFeature: string;
  columnsToPredict: string[];
}

const initialState: UploadedData = { headers: [], headerTypes: [], data: [], predictedFeature: "", columnsToPredict: [] };

export const uploadedDataSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadedData: (state, action: PayloadAction<UploadedData>) => {
      return action.payload; // Create a new state array
    },
  },
});

export const { setUploadedData } = uploadedDataSlice.actions;
export const uploadedDataSelector = (state: RootState) => state.uploadedDataReducer;
export default uploadedDataSlice.reducer;

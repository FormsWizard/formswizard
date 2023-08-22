import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

type Data = any;

export interface DataState {
  data: Data;
}

const initialState: DataState = {
  data: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTableData: (state: DataState, action: PayloadAction<Data[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setTableData } = dataSlice.actions;

//export const selectData = (state: RootState) => state.data.data || initialState.data;

export default dataSlice.reducer;

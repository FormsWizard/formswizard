import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

export interface KeysState {
  pubKeys?: string[]
}

const initialState: KeysState = {
  pubKeys: []
};

export const keysSlice = createSlice({
  name: "keys",
  initialState,
  reducers: {
    setPubKeys: (state: KeysState, action: PayloadAction<string[]>) => { 
      state.pubKeys = action.payload;
    }
  }
});

export const { setPubKeys } = keysSlice.actions;

export const selectPubKeys = (state: RootState) => state.keys.pubKeys || initialState.pubKeys;

export default keysSlice.reducer;

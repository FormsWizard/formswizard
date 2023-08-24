import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

type ArmoredPGPMessage = string;
type UUID = string;
type PGPID = string;
type ArmoredPubKey = string;

export interface CryptedData {
  data: ArmoredPGPMessage
  uuid: UUID,
  keyId: PGPID,
  armoredPublicKey: ArmoredPubKey
}

export interface CryptedDataState {
  cryptedData: CryptedData[];
}

const initialState: CryptedDataState = {
  cryptedData: [],
};

export const CryptedDataSlice = createSlice({
  name: "cryptedData",
  initialState,
  reducers: {
    setCryptedData: (state: CryptedDataState, action: PayloadAction<CryptedData>) => {
      state.cryptedData = [...state.cryptedData, action.payload];
    },
  },
});

export const { setCryptedData } = CryptedDataSlice.actions;

export const selectCryptedData = (state: RootState) => state.cryptedData.cryptedData || initialState.cryptedData;

export default CryptedDataSlice.reducer;

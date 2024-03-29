import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { enhanceReducer } from 'react-redux-yjs';
import {cryptedDataReducer, keysReducer, schemaReducer} from "project-state";
import {jsonFormsEditReducer} from "@formswizard/state/wizard/jsonFormsEditSlice";
import {appBarReducer} from "@formswizard/state/appBar/appBarSlice";
import {buildingBlocksSlice} from "@formswizard/state/buildingBlocks/buildingBlocksSlice"
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const combinedStore = configureStore({
  reducer: {
    schema: enhanceReducer(schemaReducer, 'schema'),
    keys: enhanceReducer(keysReducer, 'keys'),
    cryptedData: enhanceReducer(cryptedDataReducer, 'cryptedData'),
    jsonFormsEdit: jsonFormsEditReducer,
    AppBar: appBarReducer,
    buildingBlocks: buildingBlocksSlice.reducer
  },
});

export type AppDispatch = typeof combinedStore.dispatch;
export type RootState = ReturnType<typeof combinedStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

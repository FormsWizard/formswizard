import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import schemaReducer from '../slices/schemaSlice';
import keysReducer from '../slices/keysSlice';
import cryptedDataSlice from '../slices/cryptedDataSlice';
import { enhanceReducer } from 'react-redux-yjs';

export const store = configureStore({
  reducer: {
    schema: enhanceReducer(schemaReducer, 'schema'),
    keys: enhanceReducer(keysReducer, 'keys'),
    cryptedData: enhanceReducer(cryptedDataSlice, 'cryptedData')
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

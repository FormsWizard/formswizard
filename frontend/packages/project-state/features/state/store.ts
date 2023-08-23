import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import schemaReducer from '../slices/schemaSlice';
import keysReducer from '../slices/keysSlice';
import { enhanceReducer } from 'react-redux-yjs';

export const store = configureStore({
  reducer: {
    schema: enhanceReducer(schemaReducer, 'schema'),
    keys: enhanceReducer(keysReducer, 'keys'),
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

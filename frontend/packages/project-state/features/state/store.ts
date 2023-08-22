import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import schemaReducer from '../slices/schemaSlice';
import { enhanceReducer } from 'redux-yjs-bindings';

export const store = configureStore({
  reducer: {
    schema: enhanceReducer(schemaReducer),
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

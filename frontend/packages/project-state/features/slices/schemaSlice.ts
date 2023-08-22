import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import { JsonSchema } from '@jsonforms/core'

export interface SchemaState {
  jsonSchema?: JsonSchema
  uiSchema?: any
}

const initialState: SchemaState = {
  jsonSchema: undefined,
  uiSchema: undefined
};

export const schemaSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setJsonSchema: (state: SchemaState, action: PayloadAction<JsonSchema>) => { 
      state.jsonSchema = action.payload;
    }
  }
});

export const { setJsonSchema } = schemaSlice.actions;

export const selectJsonSchema = (state: RootState) => state.schema.jsonSchema || initialState.jsonSchema;
export const selectUiSchema = (state: RootState) => state.schema.uiSchema || initialState.uiSchema;

export default schemaSlice.reducer;

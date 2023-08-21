"use client";

import { useCallback, useState } from 'react';
import { makeStore, selectJsonSchema, selectUiSchema, useAppSelector } from "@formswizard/state";
import { Provider } from "react-redux";

import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

const store = makeStore()

function Inner() {
  const jsonSchema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);
  const [data, setData] = useState({});

  const onChange = useCallback( ({errors, data}: {errors: any[], data: any}) => {
    if(errors.length === 0) {
      setData(data)
    };
  }, []);

  return (
    <JsonForms
      renderers={materialRenderers}
      cells={materialCells}
      schema={jsonSchema}
      uischema={uiSchema}
      data={data}
      onChange={onChange}
    />
  )
}

export function Outer() {
  return (
    <Provider store={store}>
      <Inner/>
    </Provider>
  );
};

"use client";

import { useCallback, useState } from 'react';
import { Provider } from "react-redux";
import { store, useAppSelector, selectJsonSchema, selectUiSchema } from 'project-state';
import { DemoYjsProvider } from 'project-state-demo-yjs';
import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

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
      <DemoYjsProvider store={store}>
        <Inner/>
      </DemoYjsProvider>
    </Provider>
  );
};

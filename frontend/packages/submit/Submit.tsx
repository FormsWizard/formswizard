"use client";

import { useCallback, useState } from 'react';
import { Provider } from "react-redux";
import { store, useAppSelector, selectJsonSchema, selectUiSchema, selectPubKeys } from 'project-state';
import { DemoYjsProvider } from 'project-state-demo-yjs';
import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { PGPProvider, encrypt, decrypt } from 'pgp-provider';

function Form() {
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

function EncryptionExample() {
  const pubKeys = useAppSelector(selectPubKeys);
  const encrypted = encrypt('Hallo PGP', pubKeys);
  return <>{ decrypt(encrypted) }</>
}

export function Submit() {
  return (
    <Provider store={store}>
      <DemoYjsProvider store={store}>
        <Form/>
        <PGPProvider>
          <EncryptionExample/>
        </PGPProvider>
      </DemoYjsProvider>
    </Provider>
  );
};

"use client";

import { useCallback, useState } from 'react';
import { Provider } from "react-redux";
import { store, useAppSelector, selectJsonSchema, selectUiSchema, selectPubKeys, useAppDispatch, setCryptedData, selectCryptedData } from 'project-state';
import { DemoYjsProvider } from 'project-state-demo-yjs';
import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { basicRenderer } from '@formswizard/designer-basic-renderer';
import { PGPProvider, encrypt, useKeyContext } from 'pgp-provider';
import Button from '@mui/material/Button'
import { NoSsr } from '@mui/material';

function Form() {
  const [data, setData] = useState({});

  const onChange = useCallback( ({errors, data}: {errors: any[], data: any}) => {
    if(errors.length === 0) {
      setData(data)
    };
  }, []);

  const pubKeys = useAppSelector(selectPubKeys);
  const { keyId, armoredPublicKey, publicKey } = useKeyContext();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback( async () => {
    const encrypted = await encrypt(JSON.stringify(data), pubKeys, publicKey);  // TODO add signature
    if(encrypted && keyId && armoredPublicKey) {
      const cryptedData = { data: encrypted,
                            uuid: crypto.randomUUID(),
                            keyId, armoredPublicKey };
      console.info({cryptedData});
      dispatch(setCryptedData(cryptedData));
    }
  }, [data])
  const cryptedDataPublished = useAppSelector(selectCryptedData);
  console.log({cryptedDataPublished});

  const jsonSchema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);
  console.log({jsonSchema})

  return !jsonSchema ? <p>'Loading jsonSchema…'</p> : <>
    <JsonForms
      renderers={[...materialRenderers, ...basicRenderer]}
      cells={materialCells}
      schema={jsonSchema}
      uischema={uiSchema}
      data={data}
      onChange={onChange}
    />
    <Button variant="contained" onClick={onSubmit}>
      Submit
    </Button>
  </>
}

export function Submit() {
  return (
    <NoSsr>
      <Provider store={store}>
        <DemoYjsProvider store={store}>
          <PGPProvider>
            <Form/>
          </PGPProvider>
        </DemoYjsProvider>
      </Provider>
    </NoSsr>
  );
};

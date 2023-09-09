"use client";

import {useCallback, useEffect, useState} from 'react';
import {Provider} from "react-redux";
import {
  store,
  useAppSelector,
  setJsonSchema,
  selectJsonSchema,
  setUiSchema,
  selectUiSchema,
  setPubKeys,
  selectPubKeys,
  useAppDispatch,
  setCryptedData,
  selectCryptedData
} from 'project-state';
//import {DemoYjsProvider} from 'project-state-demo-yjs';
import { DefaultService, OpenAPI } from '@formswizard/api';
import {JsonForms} from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import {basicRenderer} from '@formswizard/designer-basic-renderer';
import {PGPProvider, encrypt, useKeyContext} from 'pgp-provider';
import {Button, Container, Alert, NoSsr, Grid, CircularProgress, Backdrop, Typography} from '@mui/material';

OpenAPI.BASE = 'http://localhost:4000';
const { getProjectStateSchema, getProjectStateKeys, postProjectStateCryptedData } = DefaultService;

function Form() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({});
  const [published, setPublished] = useState(false);

  const onChange = useCallback(({errors, data}: { errors: any[], data: any }) => {
    if (errors.length === 0) {
      setData(data)
    }
  }, [])

  const pubKeys = useAppSelector(selectPubKeys);
  useEffect(() => {
    async function loadKeys() {
      const { keys } = await getProjectStateKeys();
      const { pubKeys } = keys || {};
      pubKeys && dispatch(setPubKeys(pubKeys))
    }
    pubKeys || loadKeys()
  }, [pubKeys, dispatch])

  const jsonSchema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);
  useEffect(() => {
    async function loadSchema() {
      const { schema } = await getProjectStateSchema();
      const { jsonSchema, uiSchema } = schema || {};
      jsonSchema && dispatch(setJsonSchema(jsonSchema))
      jsonSchema && dispatch(setUiSchema(uiSchema))
    }
    jsonSchema || loadSchema()
  }, [jsonSchema, uiSchema, dispatch])

  const {keyId, armoredPublicKey, publicKey} = useKeyContext();

  const onSubmit = useCallback(async () => {
    const encrypted = await encrypt(JSON.stringify(data), pubKeys, publicKey);  // TODO add signature
    if (encrypted && keyId && armoredPublicKey) {
      const cryptedDatum = {
        data: encrypted,
        uuid: crypto.randomUUID(),
        keyId, armoredPublicKey
      };
      postProjectStateCryptedData({cryptedDatum})
      //dispatch(setCryptedData(cryptedDatum));
      //console.info({cryptedDatum});
      setPublished(true);
    }
  }, [data, setPublished])
  //const cryptedDataPublished = useAppSelector(selectCryptedData);

  return (
      <>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={!jsonSchema}
        >
          <CircularProgress color="inherit"/>
          Loading the schema...
        </Backdrop>
        <Container>
          {jsonSchema ?
              <Grid container spacing={2} direction={'column'}>
                <Grid item>
                  <JsonForms
                      renderers={[...materialRenderers, ...basicRenderer]}
                      cells={materialCells}
                      schema={jsonSchema}
                      uischema={uiSchema}
                      data={data}
                      onChange={onChange}
                      readonly={published}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={onSubmit} disabled={published}>
                    {published ? '✅' : ''} Submit
                  </Button>
                </Grid>
                {published &&
                    <Grid item>
                      <Alert severity={'success'}>
                        Your data has been published.
                      </Alert>
                    </Grid>
                }
              </Grid>
          : null}
        </Container>
      </>)
}

export function Submit() {
  return (
    <NoSsr>
      <Provider store={store}>
        {/*<DemoYjsProvider store={store}>*/}
          <PGPProvider>
            <Form/>
          </PGPProvider>
	{/*</DemoYjsProvider>*/}
      </Provider>
    </NoSsr>
  );
};

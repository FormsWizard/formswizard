"use client";

import { useEffect, useMemo } from 'react';
import { Provider } from "react-redux";
import { store, useAppDispatch, setJsonSchema, setUiSchema, setSchemaState, setPubKeys, useAppSelector, selectJsonSchema } from 'project-state';
import { WizardProvider, useWizard } from '@formswizard/forms-designer'
import { DemoYjsProvider } from 'project-state-demo-yjs';
import { PGPProvider, useKeyContext } from 'pgp-provider';
import { NoSsr } from '@mui/material';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

function PublishPubKeyToYjs() {
  const dispatch = useAppDispatch();
  const { armoredPublicKey } = useKeyContext();

  useEffect(() => {
    armoredPublicKey && dispatch(setPubKeys([armoredPublicKey]));
  }, [armoredPublicKey]);

  return <></>
}

function PublishSchemaToYjs({jsonSchema, uiSchema}: {jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //jsonSchema && dispatch(setSchemaState({jsonSchema, uiSchema}));
    jsonSchema && dispatch(setJsonSchema(jsonSchema));
    uiSchema && dispatch(setUiSchema(uiSchema));
    console.log('publish', {jsonSchema, uiSchema})
  }, [jsonSchema, uiSchema]);

  //const jsonSchemaPublished = useAppSelector(selectJsonSchema);
  //console.log({jsonSchema, jsonSchemaPublished})
  return <></>
}

function PublishFromWizardProvider() {
  const { jsonSchema, uiSchema } = useWizard()

  return (
    <Provider store={store}>
      <DemoYjsProvider store={store}>
        <PublishSchemaToYjs jsonSchema={jsonSchema} uiSchema={uiSchema}/>
        <PGPProvider>
          <PublishPubKeyToYjs/>
        </PGPProvider>
      </DemoYjsProvider>
    </Provider>
  )
}

export function Publish() {
  return (
    <NoSsr>
      <WizardProvider>
        <PublishFromWizardProvider/>
      </WizardProvider>
    </NoSsr> 
  );
};

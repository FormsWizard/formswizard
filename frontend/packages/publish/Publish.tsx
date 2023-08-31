"use client";

import {useCallback, useEffect} from 'react';
import { Provider } from "react-redux";
import { store, useAppDispatch, setJsonSchema, setPubKeys } from 'project-state';
import { useWizard } from '@formswizard/forms-designer'
import { DemoYjsProvider } from 'project-state-demo-yjs';
import { PGPProvider, useKeyContext } from 'pgp-provider';
import { NoSsr } from '@mui/material';
import {JsonSchema, setUISchema, UISchemaElement} from '@jsonforms/core';

function PublishPubKeyToYjs() {
  const dispatch = useAppDispatch();
  const { armoredPublicKey } = useKeyContext();

  useEffect(() => {
    armoredPublicKey && dispatch(setPubKeys([armoredPublicKey]));
  }, [armoredPublicKey]);

  return <></>
}

export function usePublishSchemaToYjs({jsonSchema, uiSchema}: {jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {
  const dispatch = useAppDispatch();

  const publish = useCallback(() => {
    dispatch(setJsonSchema(jsonSchema));
    dispatch(setUISchema(uiSchema));
  }, [jsonSchema, uiSchema]);

  return {publish}
}
function PublishSchemaToYjs({jsonSchema, uiSchema}: {jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    jsonSchema && dispatch(setJsonSchema(jsonSchema));
    uiSchema && dispatch(setUISchema(uiSchema));
  }, [jsonSchema, uiSchema]);

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
        <PublishFromWizardProvider/>
    </NoSsr>
  );
};

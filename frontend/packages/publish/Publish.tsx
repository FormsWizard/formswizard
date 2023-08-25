"use client";

import { useEffect } from 'react';
import { Provider } from "react-redux";
import { store, useAppDispatch, setJsonSchema, setPubKeys, useAppSelector, selectJsonSchema } from 'project-state';
import { makeStore } from '@formswizard/state';
import { DemoYjsProvider } from 'project-state-demo-yjs';
import { PGPProvider, useKeyContext } from 'pgp-provider';
//import { ConnectionIndicatorMenu } from 'secured-react-redux-yjs';

const storeFormsDesigner = makeStore()

/** Copy schema between stores — TODO: this should not be required after forms-designer has been adapted **/
function PublishFormsState() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { jsonSchema, uiSchema } = storeFormsDesigner.getState().jsonFormsEdit
    dispatch(setJsonSchema(jsonSchema));
  }, []);

  const jsonSchemaPublished = useAppSelector(selectJsonSchema);
  console.log({jsonSchemaPublished})
  return <></>
}

function PublishPubKey() {
  const dispatch = useAppDispatch();
  const { armoredPublicKey } = useKeyContext();

  useEffect(() => {
    armoredPublicKey && dispatch(setPubKeys([armoredPublicKey]));
  }, [armoredPublicKey]);

  return <></>
}

export function Publish() {
  return (
    <Provider store={store}>
      <DemoYjsProvider store={store}>
        {/*<ConnectionIndicatorMenu/>*/}
        <PublishFormsState/>
        <PGPProvider>
	  <PublishPubKey/>
        </PGPProvider>
      </DemoYjsProvider>
    </Provider>
  );
};

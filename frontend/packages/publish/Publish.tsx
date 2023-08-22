"use client";

import { useEffect } from 'react';
import { Provider } from "react-redux";
import { store, useAppDispatch, setJsonSchema } from 'project-state';
import { makeStore } from '@formswizard/state';
import { DemoYjsProvider } from 'project-state-demo-yjs';

const storeFormsDesigner = makeStore()

/** Copy schema between stores — TODO: this should not be required after forms-designer has been adapted **/
function Transfer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { jsonSchema, uiSchema } = storeFormsDesigner.getState().jsonFormsEdit
    dispatch(setJsonSchema(jsonSchema));
  }, []);

  return <></>
}

export function Publish() {
  return (
    <Provider store={store}>
      <DemoYjsProvider store={store}>
        <Transfer/>
      </DemoYjsProvider>
    </Provider>
  );
};

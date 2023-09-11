"use client";

import { useCallback, useEffect } from 'react';
import { api } from '@formswizard/api';
import { useKeyContext } from 'pgp-provider';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
/*
import {
  useAppDispatch,
  setJsonSchema,
  setPubKeys,
  setUiSchema
} from 'project-state';
*/


/** PublishToYjs should only be used for demo purposes.
 *  For using it, the DemoYjsProvider with combinedState must be used.
 **/

/*
function usePublishPubKeyToYjs() {
  const dispatch = useAppDispatch();
  const { armoredPublicKey } = useKeyContext();

  const publishPubKey = useCallback(() => {
    armoredPublicKey && (setPubKeys([armoredPublicKey]));
  }, [armoredPublicKey, dispatch]);

  return {publishPubKey}
}

function usePublishSchemaToYjs({jsonSchema, uiSchema}: {jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {
  const dispatch = useAppDispatch();

  const publishSchema = useCallback(() => {
    dispatch(setJsonSchema(jsonSchema));
    dispatch(setUiSchema(uiSchema));
  }, [jsonSchema, uiSchema, dispatch]);

  return {publishSchema}
}
*/

/** PublishToServer are the default implementations that should be used for productive setups **/

function usePublishPubKeyToServer({formId, formAdminToken}: {formId: string, formAdminToken: string}) {
  const { armoredPublicKey } = useKeyContext()

  const publishPubKey = useCallback(() => {
    armoredPublicKey && api.postProjectStateKeys({formId, formAdminToken, keys: {pubKeys: [armoredPublicKey]}});
  }, [armoredPublicKey]);
  return {publishPubKey}
}

function usePublishSchemaToServer({formId, formAdminToken, jsonSchema, uiSchema}: {formId: string, formAdminToken: string, jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {

  const publishSchema = useCallback(() => {
    api.postProjectStateSchema({formId, formAdminToken, schema: {jsonSchema, uiSchema}});
  }, [jsonSchema, uiSchema]);
  return {publishSchema}
}


export const usePublishPubKey = usePublishPubKeyToServer
export const usePublishSchema = usePublishSchemaToServer

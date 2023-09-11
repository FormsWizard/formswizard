"use client";

import { useCallback, useEffect } from 'react';
import { DefaultService, OpenAPI } from '@formswizard/api';
import { useKeyContext } from 'pgp-provider';
import {JsonSchema, UISchemaElement} from '@jsonforms/core';
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

OpenAPI.BASE = 'http://localhost:4000';

function usePublishPubKeyToServer({formId, formAdminToken}: {formId: string, formAdminToken: string}) {
  const { armoredPublicKey } = useKeyContext()
  const { postProjectStateKeys } = DefaultService;

  const publishPubKey = useCallback(() => {
    armoredPublicKey && postProjectStateKeys({formId, formAdminToken, keys: {pubKeys: [armoredPublicKey]}});
  }, [armoredPublicKey, postProjectStateKeys]);
  return {publishPubKey}
}

function usePublishSchemaToServer({formId, formAdminToken, jsonSchema, uiSchema}: {formId: string, formAdminToken: string, jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {
  const { postProjectStateSchema } = DefaultService;

  const publishSchema = useCallback(() => {
    postProjectStateSchema({formId, formAdminToken, schema: {jsonSchema, uiSchema}});
  }, [jsonSchema, uiSchema, postProjectStateSchema]);
  return {publishSchema}
}


export const usePublishPubKey = usePublishPubKeyToServer
export const usePublishSchema = usePublishSchemaToServer

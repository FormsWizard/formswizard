"use client";

import {useCallback, useEffect} from 'react';
import {
  useAppDispatch,
  setJsonSchema,
  setPubKeys,
  setUiSchema
} from 'project-state';
import { useKeyContext } from 'pgp-provider';
import {JsonSchema, UISchemaElement} from '@jsonforms/core';

export function usePublishPubKeyToYjs() {
  const dispatch = useAppDispatch();
  const { armoredPublicKey } = useKeyContext();

  const publishPubKey = useCallback(() => {
    armoredPublicKey && (setPubKeys([armoredPublicKey]));
  }, [armoredPublicKey, dispatch]);

  return {publishPubKey}
}

export function usePublishSchemaToYjs({jsonSchema, uiSchema}: {jsonSchema: JsonSchema, uiSchema: UISchemaElement}) {
  const dispatch = useAppDispatch();

  const publishSchema = useCallback(() => {
    dispatch(setJsonSchema(jsonSchema));
    dispatch(setUiSchema(uiSchema));
  }, [jsonSchema, uiSchema, dispatch]);

  return {publishSchema}
}

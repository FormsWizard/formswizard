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
    dispatch(setUiSchema(uiSchema));
  }, [jsonSchema, uiSchema, dispatch]);

  return {publish}
}

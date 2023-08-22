"use client";

import { useCallback, useState, useEffect } from 'react';
import { makeStore, selectJsonSchema, selectUiSchema, useAppSelector } from "@formswizard/state";
import { Provider } from "react-redux";

import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

import { generateKey,
         readKey, createMessage, encrypt,
         readPrivateKey, decryptKey, readMessage, decrypt
       } from 'openpgp';

const store = makeStore()

function Inner() {
  const jsonSchema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);
  const [data, setData] = useState({});

  const onChange = useCallback( ({errors, data}: {errors: any[], data: any}) => {
    if(errors.length === 0) {
      setData(data)
    };
  }, []);

  useEffect( () => {
    const asyncEffect = async () => {
      const passphrase = 'super long and hard to guess secret';
      const armoredKeyPair = await generateKey({ type: 'ecc', curve: 'curve25519',
                                                 userIDs: [{ name: 'Jon Doe', email: 'jon@example.com' }],
                                                 passphrase, format: 'armored'
                                               });

      const publicKey = await readKey({armoredKey: armoredKeyPair.publicKey});
      const plaintext = 'hallo';
      const message = await createMessage({ text: plaintext });
      const encrypted = await encrypt({ message,
                                        encryptionKeys: publicKey,
                                      });

      const privateKey = await decryptKey({ privateKey: await readPrivateKey({ armoredKey: armoredKeyPair.privateKey }),
                                            passphrase
                                          });
      const encryptedMessage = await readMessage({ armoredMessage: encrypted });
      const { data: decrypted } = await decrypt({ message: encryptedMessage,
                                                  decryptionKeys: privateKey
                                                });
      console.log({decrypted});
    };
    asyncEffect();
  })

  return (
    <JsonForms
      renderers={materialRenderers}
      cells={materialCells}
      schema={jsonSchema}
      uischema={uiSchema}
      data={data}
      onChange={onChange}
    />
  )
}

export function Outer() {
  return (
    <Provider store={store}>
      <Inner/>
    </Provider>
  );
};

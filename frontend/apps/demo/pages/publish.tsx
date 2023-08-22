import { PGPProvider, useKeyContext, encrypt, decrypt } from 'pgp-provider';
import { useEffect, useState } from 'react';

function KeyInfo() {
  const { keyId } = useKeyContext();
  return <p>
    New submitted Datasets will be encrypted with PGP-Key { keyId } (stored at localStore).
  </p>
}

function EncryptionExample() {
  const encrypted = encrypt('Hallo PGP');
  return <>{ decrypt(encrypted) }</>
}

export default function Publish() {
  return <PGPProvider>
    <>
      <KeyInfo/>
      <EncryptionExample/>
    </>
  </PGPProvider>
}

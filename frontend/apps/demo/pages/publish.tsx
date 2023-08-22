import { PGPProvider, useKeyContext, encrypt, decrypt } from 'pgp-provider';
import { Publish } from 'publish';

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

export default function Publish_() {
  return <>
    <Publish/>

    <PGPProvider>
      <KeyInfo/>
      <EncryptionExample/>
    </PGPProvider>
  </>
}

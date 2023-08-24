import { PGPProvider, useKeyContext, encryptUsingContext, decryptUsingContext } from 'pgp-provider';
import { Publish } from 'publish';

function KeyInfo() {
  const { keyId } = useKeyContext();
  return <p>
    New submitted Datasets will be encrypted with PGP-Key { keyId } (stored at localStore).
  </p>
}

function EncryptionExample() {
  const encrypted = encryptUsingContext('Hallo PGP');
  return <>{ decryptUsingContext(encrypted) }</>
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

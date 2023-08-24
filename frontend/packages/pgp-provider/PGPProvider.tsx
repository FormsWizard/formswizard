import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicKey, PrivateKey,
	 generateKey,
         readKey, readPrivateKey, decryptKey, GenerateKeyOptions,
         createMessage, encrypt as pgp_encrypt,
         readMessage, decrypt as pgp_decrypt
       } from 'openpgp';

interface KeyPair {
  keyId?: string,
  armoredPublicKey?: string,
  armoredPrivateKey?: string,
  publicKey?: PublicKey,
  privateKey?: PrivateKey
}

const PGPContext = createContext<KeyPair>({});
export function useKeyContext() {
  return useContext(PGPContext);
};

export function PGPProvider({generateKeyOptions={}, children}: {generateKeyOptions?: Partial<GenerateKeyOptions>, children: ReactNode}) {
  const [keyPair, setKeyPair] = useState<KeyPair>({});
  const {passphrase} = generateKeyOptions;

  useEffect( () => {
    const asyncEffect = async () => {
      if(window?.localStorage) {

        /** If no keypair is stored in localStorage, we create one **/
	if(!window.localStorage.getItem('armoredPrivateKey')) {
          const armoredKeyPair = await generateKey({ userIDs: [{ name: 'Anonymous' }],
						     ...generateKeyOptions,
                                                     format: 'armored'
                                                   });
          window.localStorage.setItem('armoredPublicKey', armoredKeyPair.publicKey);
          window.localStorage.setItem('armoredPrivateKey', armoredKeyPair.privateKey);
        };

	/** Load keypair from localStorage to state available via `useKeyContext()` **/
	const armoredPublicKey = window.localStorage.getItem('armoredPublicKey');
	const armoredPrivateKey = window.localStorage.getItem('armoredPrivateKey');
	if( armoredPublicKey && armoredPrivateKey &&
	    (keyPair.armoredPublicKey != armoredPublicKey || keyPair.armoredPrivateKey != armoredPrivateKey) ) {
          const publicKey = await readKey({armoredKey: armoredPublicKey});
	  let privateKey = await readPrivateKey({ armoredKey: armoredPrivateKey });
	  if(passphrase) {
            try {
              privateKey = await decryptKey({ privateKey, passphrase });
            } catch (e) {
              console.error('You might want to delete the key from localStorage.')
              console.warn(e)
	    }
	  }
          setKeyPair({
	    keyId: `0x${publicKey?.getKeyID().toHex()}`,
            armoredPublicKey,
            armoredPrivateKey,
            publicKey,
            privateKey
          });
	};

      };
    };
    asyncEffect();
  }, [keyPair, setKeyPair])

  return (
    <PGPContext.Provider value={keyPair}>
      {children}
    </PGPContext.Provider>
  )
}

export async function encrypt(text: string, armoredPubKeys?: string[], publicKey?: PublicKey) {
  const pubKeys = await Promise.all( (armoredPubKeys||[]).map( async armoredKey => await readKey({armoredKey}) ))
  const encryptionKeys = publicKey ? [publicKey, ...pubKeys] : pubKeys;

  if(encryptionKeys.length) {
    const message = await createMessage({ text });
    return (await pgp_encrypt({message, encryptionKeys})).toString()
  }
}

export function encryptUsingContext(text: string, armoredPubKeys?: string[]) {
  const {publicKey} = useKeyContext();  // The users publicKey will used in addition to the optionally specified armoredPubKeys
  const [encrypted, setEncrypted] = useState<string>();

  useEffect(() => {
    const asyncEffect = async () => {
      const encrypted = await encrypt(text, armoredPubKeys, publicKey);
      setEncrypted(encrypted);
    };
    asyncEffect();
  }, [text, publicKey, setEncrypted]);

  return encrypted;
};

export function decryptUsingContext(armoredMessage?: string) {
  const {privateKey: decryptionKeys} = useKeyContext();
  const [decrypted, setDecrypted] = useState<string>();

  useEffect(() => {
    const asyncEffect = async () => {
      if(decryptionKeys && armoredMessage) {
        const message = await readMessage({ armoredMessage });
        pgp_decrypt({ message, decryptionKeys })
	.then(x => setDecrypted(x.data.toString()))
	.catch(e => { console.error('Decryption failed. Do you have a correct privateKey?')
                      console.warn(e) })
      }
    };
    asyncEffect();
  }, [armoredMessage, decryptionKeys, setDecrypted]);

  return decrypted;
};

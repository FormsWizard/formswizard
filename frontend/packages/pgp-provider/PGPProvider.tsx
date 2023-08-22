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
              console.error(e)
              console.warn('You might want to delete the key from localStorage')
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

export function encrypt(text: string) {
  const {publicKey: encryptionKeys} = useKeyContext();
  const [encrypted, setEncrypted] = useState<string>();

  useEffect(() => {
    const asyncEffect = async () => {
      if(encryptionKeys) {
        const message = await createMessage({ text });
        pgp_encrypt({message, encryptionKeys}).then(x => setEncrypted(x.toString()));
      }
    };
    asyncEffect();
  }, [text, encryptionKeys, setEncrypted]);

  return encrypted;
};

export function decrypt(armoredMessage?: string) {
  const {privateKey: decryptionKeys} = useKeyContext();
  const [decrypted, setDecrypted] = useState<string>();

  useEffect(() => {
    const asyncEffect = async () => {
      if(decryptionKeys && armoredMessage) {
        const message = await readMessage({ armoredMessage });
        pgp_decrypt({ message, decryptionKeys }).then(x => setDecrypted(x.data.toString()))
      }
    };
    asyncEffect();
  }, [armoredMessage, decryptionKeys, setDecrypted]);

  return decrypted;
};

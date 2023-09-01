import { PropsWithChildren } from 'react';
import { YProvider, YState } from "react-redux-yjs";
import { Store } from '@reduxjs/toolkit';

interface Props {
  store: Store
}

/** Exchanging this state via Yjs is not intended for productive use, but only for the demo build.
 *  Integrity is not provided. Attackers might:
 *  - change state to cause denial of service
 *  - change the schema
 *  - read communication metadata to gain knowledge about users
 **/
export function DemoYjsProvider({children, store}: PropsWithChildren<Props>) {
  const hash = typeof location != 'undefined' ? location.hash.slice(1) : '';
  const hashParameters = !hash ? {} : Object.fromEntries(new URLSearchParams(hash) as any);

  const initialYState: Partial<YState> = {slices: [{store, slice: 'schema', logging: true,  // TODO
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: hashParameters.formId}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de',
                                                                            room: hashParameters.formId}}},
                                                   {store, slice: 'keys', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: hashParameters.formId}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de',
                                                                            room: hashParameters.formId}}},
                                                   {store, slice: 'cryptedData', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: hashParameters.formId}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de',
                                                                            room: hashParameters.formId}}}  ]}


  return (
    <YProvider initialYState={initialYState}>
      <>{children as any}</>
    </YProvider>
  )
}

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
  const initialYState: Partial<YState> = {slices: [{store, slice: 'schema', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de'}}},
                                                   {store, slice: 'keys', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de'}}},
                                                   {store, slice: 'cryptedData', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de'}}} ]}

  return (
    <YProvider initialYState={initialYState}>
      <>{children as any}</>
    </YProvider>
  )
}

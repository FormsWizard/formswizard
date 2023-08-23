import { PropsWithChildren } from 'react';
import { YProvider, YState } from "react-redux-yjs";
import { Store } from '@reduxjs/toolkit';

interface Props {
  store: Store
}

export function DemoYjsProvider({children, store}: PropsWithChildren<Props>) {
  const initialYState: Partial<YState> = {slices: [{store, slice: 'schema', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'ws://localhost:1234'}}},
                                                   {store, slice: 'keys', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'ws://localhost:1234'}}} ]}

  return (
    <YProvider initialYState={initialYState}>
      {children}
    </YProvider>
  )
}

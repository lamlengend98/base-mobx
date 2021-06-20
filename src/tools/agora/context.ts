import { createContext } from 'react';
import { AgoraContextValue } from './types';

const NOOP = () => {};

export const AgoraContext = createContext<AgoraContextValue>({
  startCall: async () => {},
  endCall: NOOP,
});

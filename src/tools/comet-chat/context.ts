import { createContext } from 'react';
import { CometChatContextValue } from './types';

const NOOP = () => {};

export const CometChatContext = createContext<CometChatContextValue>({
  createUser: NOOP,
  login: NOOP,
  logout: NOOP,
  sendMessage: NOOP,
  sendCustomMessage: NOOP,
  messages: [],
  isInitialization: false,
});

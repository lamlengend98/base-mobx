import { createContext } from 'react';
import { MemberCodeContextValue } from './types';

const NOOP = () => {};

export const MemberCodeContext = createContext<MemberCodeContextValue>({
  show: NOOP,
  close: NOOP,
});

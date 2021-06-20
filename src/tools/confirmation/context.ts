import { createContext } from 'react';
import { ConfirmationContextValue } from './types';

const NOOP = () => {};

export const ConfirmationContext = createContext<ConfirmationContextValue>({
  show: NOOP,
  close: NOOP,
  showInfo: NOOP,
});

import { createContext } from 'react';
import { AlertDialogContextValue } from './types';

const NOOP = () => {};

export const AlertDialogContext = createContext<AlertDialogContextValue>({
  show: NOOP,
  close: NOOP,
});

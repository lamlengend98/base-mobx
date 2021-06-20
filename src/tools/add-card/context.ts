import { createContext } from 'react';
import { AddCardContextValue } from './types';

const NOOP = () => {};

export const AddCardContext = createContext<AddCardContextValue>({
  show: NOOP,
  close: NOOP,
});

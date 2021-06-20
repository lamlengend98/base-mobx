import { createContext } from 'react';
import { DropdownAlertContextValueProps } from './types';

const NOOP = () => {};

export const DropdownAlertContext = createContext<
  DropdownAlertContextValueProps
>({
  show: NOOP,
  close: NOOP,
});

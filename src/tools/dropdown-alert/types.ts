import { ReactNode } from 'react';

export type DropdownAlertContextValue = {
  children: ReactNode;
};

export type DropdownAlertContextValueProps = {
  show: (message: any) => void;
  close: (data: any) => void;
  showWarning: (message: string, time: number) => void;
};

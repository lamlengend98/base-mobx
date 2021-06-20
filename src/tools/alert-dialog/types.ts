import { ReactNode } from 'react';

export type AlertDialogProviderProps = {
  children: ReactNode;
};

export type AlertDialogContextValue = {
  show: (params: AlertDialogData) => void;
  close: () => void;
};

export type ButtonData = {
  text: string;
  onPress: () => void;
};

export type AlertDialogData = {
  title?: string;
  supportText: string;
  subSupportText?: string;
  buttons?: ButtonData[];
};

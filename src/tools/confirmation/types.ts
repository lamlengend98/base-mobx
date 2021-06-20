import { ReactNode } from 'react';

export type ConfirmationProviderProps = {
  children: ReactNode;
};

export type ConfirmationContextValue = {
  show: (params?: ConfirmationData) => void;
  showInfo: (params?: ConfirmationData) => void;
  close: () => void;
};

export type ButtonData = {
  text: string;
  onPress: () => void;
};

export type ConfirmationData = {
  title?: string;
  supportText: string;
  subSupportText?: string;
  buttons?: ButtonData[];
};

export enum TypeDialog {
  CONFIRM,
  INFO,
}

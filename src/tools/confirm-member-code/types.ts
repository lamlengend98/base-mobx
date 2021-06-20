import { ReactNode } from 'react';

export type MemberCodeProviderProps = {
  children: ReactNode;
};

export type MemberCodeContextValue = {
  show: (signed?: boolean) => void;
  close: () => void;
};

export type ButtonData = {
  text: string;
  onPress: () => void;
};

export type MemberCodeData = {
  title?: string;
  supportText: string;
  subSupportText?: string;
  buttons?: ButtonData[];
};

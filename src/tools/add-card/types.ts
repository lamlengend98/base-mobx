import { ReactNode } from 'react';

export type AddCardProviderProps = {
  children: ReactNode;
};

export type AddCardContextValue = {
  show: (params: AddCardData, action: CardAction) => void;
  close: () => void;
  open?: (action: any) => void;
};

export type ButtonData = {
  text: string;
  onPress: () => void;
};

export type AddCardData = {
  amount: number;
  payBy: string;
  payList: {
    title: string;
    amount: number;
    time: string;
    email: string;
  }[];
};
export type CardAction = {
  action: any;
};

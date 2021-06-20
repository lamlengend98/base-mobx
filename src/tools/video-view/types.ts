import { ReactNode } from 'react';

export type VideoViewValue = {
  show: (url: string, time: number) => void;
  dismiss: () => void;
};

export type VideoViewProps = {
  children: ReactNode;
};

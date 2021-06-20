import { ReactNode } from 'react';

export type ImageViewValue = {
  show: (urls: string[]) => void;
  dismiss: () => void;
};

export type ImageViewProps = {
  children: ReactNode;
};

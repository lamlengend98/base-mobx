import { ReactNode } from 'react';

export type MediaTransferProviderProps = {
  children: ReactNode;
};

export type MediaTransferContextValue = {
  onRecord: () => Promise<string | undefined>;
  onStop: () => void;
  onPlay: (uri: string, callback?: (state: any) => void) => Promise<void>;
};
export type MediaTransferData = {};

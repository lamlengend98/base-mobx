import { createContext } from 'react';
import { MediaTransferContextValue } from './types';

const NOOP = () => {};

export const MediaTransferContext = createContext<MediaTransferContextValue>({
  onRecord: NOOP,
  onStop: NOOP,
});

import { createContext } from 'react';
import { VideoViewValue } from './types';

const NOOP = () => {};

export const VideoViewContext = createContext<VideoViewValue>({
  dismiss: NOOP,
  show: NOOP,
});

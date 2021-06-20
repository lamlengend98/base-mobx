import { createContext } from 'react';
import { NetInfo } from './types';

export const NetworkContext = createContext<NetInfo>({});

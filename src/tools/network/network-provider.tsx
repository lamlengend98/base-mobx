import React from 'react';
import { NetworkContext } from './network-context';
import { NetInfoProvider } from './types';

export const NetworkProvider = ({ children, value }: NetInfoProvider) => {
  return (
    <NetworkContext.Provider {...{ value }}>{children}</NetworkContext.Provider>
  );
};

NetworkContext.displayName = 'NetworkProvider';

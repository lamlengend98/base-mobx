import React, { ReactNode } from 'react';
import { DefaultTheme } from './default-theme';
import { ThemeContext } from './theme-context';

type ThemeProviderProps = {
  children: ReactNode;
  value?: typeof DefaultTheme;
};

export const ThemeProvider = ({
  children,
  value = DefaultTheme,
}: ThemeProviderProps): JSX.Element => {
  return (
    <ThemeContext.Provider {...{ value }}>{children}</ThemeContext.Provider>
  );
};

ThemeContext.displayName = 'ThemeProvider';

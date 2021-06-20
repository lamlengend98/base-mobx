import { useContext } from 'react';
import { ThemeContext } from './theme-context';

export const useTheme = () => {
  const payload = useContext(ThemeContext);
  if (!payload) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return payload;
};

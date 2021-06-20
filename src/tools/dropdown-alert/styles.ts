import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export const useStyleDropdownAlert = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        patient: {
          backgroundColor: colors.blue,
        },
      }),
    [colors],
  );
};

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from '@/theme';

export const useStyleLegal = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          padding: Platform.SizeScale(10),
          fontSize: Platform.SizeScale(15),
        },
      }),
    [],
  );
};

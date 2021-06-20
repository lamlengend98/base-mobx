import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesRate = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
        },
        inActive: {
          color: colors.gray,
          fontSize: Platform.SizeScale(12),
          marginHorizontal: Platform.SizeScale(1),
        },
        active: {
          color: colors.blue,
          fontSize: Platform.SizeScale(12),
          marginHorizontal: Platform.SizeScale(1),
        },
      }),
    [colors],
  );
};

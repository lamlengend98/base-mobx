import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesSwitch = () => {
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
        },
        inActive: {
          color: colors.gray,
        },
        active: {
          color: colors.lightGreen,
        },
        label: {
          ...typography.regularSfPro,
          fontSize: Platform.SizeScale(18),
        },
      }),
    [colors, typography],
  );
};

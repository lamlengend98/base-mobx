import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleText = () => {
  const { colors, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        showMore: {
          textDecorationLine: 'underline',
          ...typography.regularRoboto,
          fontSize: Platform.SizeScale(10),
          color: colors.blue,
        },
      }),
    [colors.blue, typography.regularRoboto],
  );

  return styles;
};

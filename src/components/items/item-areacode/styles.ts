import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemAreacode = () => {
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: Platform.SizeScale(200),
          padding: Platform.SizeScale(5),
          paddingVertical: Platform.SizeScale(15),
          borderBottomWidth: 0.5,
          borderBottomColor: colors.gray,
        },
      }),
    [colors],
  );
};

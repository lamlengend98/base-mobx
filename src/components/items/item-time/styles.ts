import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemTime = () => {
  const { colors } = useTheme();
  const width = (Platform.deviceWidth - 4 * 6 * 2 - 20) / 4;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          paddingVertical: Platform.SizeScale(5),
          borderRadius: Platform.SizeScale(40),
          marginHorizontal: Platform.SizeScale(2),
          marginBottom: Platform.SizeScale(6),
        },
        selectedText: {
          fontSize: Platform.SizeScale(13),
          color: colors.blue,
        },
        unselectedText: {
          fontSize: Platform.SizeScale(13),
          color: colors.inputLabel,
        },
        selected: {
          backgroundColor: colors.white,
          borderWidth: Platform.SizeScale(1),
          borderColor: colors.blue,
        },
        unselected: {
          backgroundColor: colors.lightGray,
          borderWidth: Platform.SizeScale(1),
          borderColor: colors.lightGray,
        },
      }),
    [colors, width],
  );
};

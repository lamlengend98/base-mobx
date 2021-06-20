import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemDate = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: Platform.SizeScale(90),
          height: Platform.SizeScale(90),
          borderRadius: Platform.SizeScale(10),
          marginRight: Platform.SizeScale(10),
        },
        dayOfMonth: {
          marginVertical: Platform.SizeScale(5),
        },
        selectedText: {
          color: colors.blue,
        },
        unselectedText: {
          color: colors.inputLabel,
          fontSize: Platform.SizeScale(14),
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
    [colors],
  );
};

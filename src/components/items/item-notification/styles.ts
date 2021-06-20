import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemNotification = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: Platform.SizeScale(5),
          paddingHorizontal: Platform.SizeScale(5),
          marginHorizontal: Platform.SizeScale(10),
          marginVertical: Platform.SizeScale(4),
        },
        detailsContainer: {
          flexDirection: 'row',
          paddingVertical: Platform.SizeScale(5),
        },
        content: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: Platform.SizeScale(5),
        },
        title: {
          color: colors.black,
        },
        time: {
          paddingVertical: Platform.SizeScale(3),
        },
        button: {
          width: Platform.SizeScale(100),
          alignItems: 'center',
        },
        iconContainer: {
          backgroundColor: colors.white,
          width: Platform.SizeScale(48),
          height: Platform.SizeScale(48),
          borderRadius: Platform.SizeScale(24),
          borderColor: colors.gray,
          borderWidth: Platform.SizeScale(1),
          marginRight: Platform.SizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
        },
        icon: {
          fontSize: Platform.SizeScale(18),
          color: colors.lightBlue,
        },
      }),
    [colors],
  );
};

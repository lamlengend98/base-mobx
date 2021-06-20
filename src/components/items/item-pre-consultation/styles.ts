import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemDate = () => {
  const { colors } = useTheme();
  const itemSize = (Platform.deviceWidth - 50) / 4;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Platform.SizeScale(10),
        },
        selected: {
          borderWidth: Platform.SizeScale(2),
          borderColor: colors.lightGreen,
        },
        unselected: {},
        avatar: {
          width: itemSize,
          height: Platform.SizeScale(itemSize),
          marginHorizontal: Platform.SizeScale(5),
          marginTop: Platform.SizeScale(5),
          borderRadius: Platform.SizeScale(10),
        },
        name: {
          marginTop: Platform.SizeScale(3),
          marginBottom: Platform.SizeScale(10),
          textAlign: 'center',
        },
        iconStatusContainer: {
          position: 'absolute',
          top: 0,
          right: 0,
          width: Platform.SizeScale(16),
          height: Platform.SizeScale(16),
          borderRadius: Platform.SizeScale(8),
          paddingTop: Platform.SizeScale(1),
          paddingLeft: Platform.SizeScale(1),
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 2,
          backgroundColor: colors.lightGreen,
        },
        iconStatus: {
          fontSize: Platform.SizeScale(8),
          color: colors.white,
        },
      }),
    [colors, itemSize],
  );
};

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemDoctor = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: Platform.SizeScale(5),
          paddingHorizontal: Platform.SizeScale(10),
          marginHorizontal: Platform.SizeScale(10),
          marginVertical: Platform.SizeScale(5),
          borderRadius: Platform.SizeScale(10),
          backgroundColor: colors.white,
        },
        detailsContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: Platform.SizeScale(10),
        },
        avatar: {
          width: Platform.SizeScale(100),
          height: Platform.SizeScale(100),
        },
        name: {
          color: colors.blue,
        },
        reviewText: {
          color: colors.blue,
          textAlign: 'center',
          marginTop: Platform.SizeScale(3),
        },
        description: {
          fontSize: Platform.SizeScale(12),
        },
        actions: {
          flexDirection: 'row',
          marginTop: Platform.SizeScale(10),
        },
        iconContainer: {
          backgroundColor: colors.white,
          width: Platform.SizeScale(32),
          height: Platform.SizeScale(32),
          borderRadius: Platform.SizeScale(16),
          borderColor: colors.gray,
          borderWidth: Platform.SizeScale(1),
          marginRight: Platform.SizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconCall: {
          fontSize: Platform.SizeScale(13),
          color: colors.blue,
        },
        iconMsg: {
          fontSize: Platform.SizeScale(16),
          color: colors.blue,
        },
        rating: {
          fontSize: Platform.SizeScale(12),
        },
      }),
    [colors],
  );
};

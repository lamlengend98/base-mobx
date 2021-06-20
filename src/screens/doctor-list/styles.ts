import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleDoctors = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.darkGray2,
        },
        doctorContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: Platform.SizeScale(9),
          backgroundColor: colors.white,
          width: '90%',
          borderRadius: Platform.SizeScale(24),
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        input: {
          borderColor: 'transparent',
          width: Platform.deviceWidth / 1.6,
        },
        filterContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(10),
          flexWrap: 'wrap',
        },
        filter: {
          paddingVertical: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(5),
        },
        deleteIcon: {
          fontSize: Platform.SizeScale(10),
          padding: Platform.SizeScale(5),
          color: colors.darkGray,
        },
        doctorList: {
          width: '100%',
        },
      }),
    [insets, colors],
  );
};

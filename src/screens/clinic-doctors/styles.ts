import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleClinicDoctorsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.lightGray,
        },
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(25),
          margin: Platform.SizeScale(10),
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        input: {
          borderColor: 'transparent',
          width: Platform.deviceWidth / 2,
        },
        filterContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: Platform.SizeScale(10),
          flexWrap: 'wrap',
        },
        filter: {
          flexDirection: 'row',
          height: Platform.SizeScale(36),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Platform.SizeScale(10),
          borderRadius: Platform.SizeScale(20),
          backgroundColor: colors.white,
          paddingVertical: Platform.SizeScale(5),
          margin: Platform.SizeScale(5),
        },
        deleteIcon: {
          fontSize: Platform.SizeScale(10),
          padding: Platform.SizeScale(5),
          color: colors.darkGray,
        },
        section: {
          marginTop: Platform.SizeScale(15),
          marginBottom: Platform.SizeScale(10),
          marginLeft: Platform.SizeScale(10),
        },
        footer: {
          backgroundColor: colors.lightGray,
          height: insets.bottom,
          width: Platform.deviceWidth,
        },
        list: {
          width: '100%',
        },
      }),
    [insets, colors],
  );
};

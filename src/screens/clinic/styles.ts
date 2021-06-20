import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleClinicScreen = () => {
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
          backgroundColor: colors.lightGray,
        },
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(25),
          margin: Platform.SizeScale(10),
          width: '70%',
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        input: {
          borderColor: 'transparent',
          width: '160%',
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
        list: {
          width: '100%',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        btn: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: Platform.SizeScale(36),
          width: '18%',
          paddingHorizontal: Platform.SizeScale(20),
          borderRadius: Platform.SizeScale(20),
          marginLeft: Platform.SizeScale(10),
          backgroundColor: colors.blue,
        },
        iconContainer: {
          width: '20%',
          alignItems: 'center',
        },
        btnText: {
          color: colors.white,
          fontWeight: 'bold',
        },
        footer: {
          height: Platform.SizeScale(30),
        },
      }),
    [insets, colors],
  );
};

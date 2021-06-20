import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleCallList = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        },
        profileContainer: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Platform.SizeScale(30),
          backgroundColor: colors.blue,
        },
        avatarContainer: {
          width: Platform.SizeScale(55),
          height: Platform.SizeScale(55),
          marginLeft: Platform.SizeScale(20),
        },
        avatar: {
          width: Platform.SizeScale(55),
          height: Platform.SizeScale(55),
          borderRadius: Platform.SizeScale(28),
        },
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(18),
          margin: Platform.SizeScale(10),
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
          flexWrap: 'wrap',
        },
        filter: {
          flexDirection: 'row',
          height: Platform.SizeScale(36),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Platform.SizeScale(10),
          borderRadius: Platform.SizeScale(20),
          backgroundColor: colors.lightGray,
          paddingVertical: Platform.SizeScale(5),
          marginHorizontal: Platform.SizeScale(5),
          marginVertical: Platform.SizeScale(2),
        },
        filterText: {
          fontSize: Platform.SizeScale(14),
          lineHeight: Platform.SizeScale(17),
        },
        deleteIcon: {
          fontSize: Platform.SizeScale(10),
          padding: Platform.SizeScale(5),
          color: colors.darkGray,
        },
        statusContainer: {
          width: Platform.SizeScale(16),
          height: Platform.SizeScale(16),
          borderRadius: Platform.SizeScale(8),
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
        },
        statusText: {
          fontSize: Platform.SizeScale(9),
          color: colors.lightGreen,
        },
        titleContainer: {
          flexDirection: 'column',
        },
        greeting: {
          fontSize: Platform.SizeScale(24),
          color: colors.white,
        },
        name: {
          fontSize: Platform.SizeScale(24),
          color: colors.white,
        },
        patientList: {
          width: '100%',
          marginTop: Platform.SizeScale(10),
          paddingBottom: Platform.SizeScale(50),
        },
        separator: {
          backgroundColor: colors.lightGray,
          height: Platform.SizeScale(1),
        },
        emptyStyle: {
          alignSelf: 'center',
          marginTop: 10,
        },
        emptyText: {
          fontSize: Platform.SizeScale(16),
          fontWeight: '500',
        },
      }),
    [insets, colors],
  );
};

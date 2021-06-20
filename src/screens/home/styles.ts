import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleHome = () => {
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.grayish,
        },
        searchContainer: {
          flexDirection: 'row',
          padding: Platform.SizeScale(10),
          marginHorizontal: Platform.SizeScale(15),
          backgroundColor: colors.white,
          marginVertical: Platform.SizeScale(9),
          width: '90%',
          borderRadius: Platform.SizeScale(24),
          alignItems: 'center',
          justifyContent: 'center',
        },
        search: {
          marginLeft: Platform.SizeScale(10),
          fontSize: Platform.SizeScale(14),
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        sectionContainer: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: Platform.SizeScale(15),
          marginTop: Platform.SizeScale(10),
        },
        section: {
          ...typography.boldRoboto,
          fontSize: Platform.SizeScale(24),
          marginHorizontal: Platform.SizeScale(20),
          marginVertical: Platform.SizeScale(10),
        },
        categoryList: {
          marginLeft: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(10),
        },
        topDoctorList: {
          width: '100%',
        },
        topicWidth: {
          width: Platform.deviceWidth,
        },
        footer: {
          backgroundColor: colors.grayish,
          height: Platform.SizeScale(50),
          width: Platform.deviceWidth,
        },
      }),
    [colors, typography],
  );
};

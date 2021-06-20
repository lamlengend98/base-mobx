import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleSymptom = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const filterItemWidth = (Platform.deviceWidth - 40) / 2;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        },
        contentContainer: {
          flex: 1,
          width: '100%',
          backgroundColor: colors.lightGray,
          paddingTop: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(10),
        },
        section: {
          marginVertical: Platform.SizeScale(10),
          marginHorizontal: Platform.SizeScale(5),
        },
        sectionInfo: {
          width: '100%',
          marginVertical: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(10),
        },
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(18),
          marginHorizontal: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(5),
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        input: {
          borderColor: 'transparent',
          width: Platform.deviceWidth / 1.7,
        },
        filter: {
          flexDirection: 'row',
          width: filterItemWidth,
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
        plusIcon: {
          fontSize: Platform.SizeScale(14),
          padding: Platform.SizeScale(5),
          color: colors.darkGray,
        },
        comboBoxIcon: {
          fontSize: Platform.SizeScale(8),
          padding: Platform.SizeScale(5),
          color: colors.darkGray,
        },
        doctorList: {
          width: '100%',
        },
        medicalInfo: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        medicalInfoValue: {
          flex: 1,
          textAlign: 'right',
        },
        separator: {
          width: '100%',
          height: Platform.SizeScale(1),
          marginVertical: Platform.SizeScale(10),
          backgroundColor: colors.gray,
        },
        bottomContainer: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        },
        button: {
          width: '50%',
          marginVertical: Platform.SizeScale(8),
        },
      }),
    [insets, colors, filterItemWidth],
  );
};

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleMedicalHistory = () => {
  const { colors } = useTheme();

  const filterItemWidth = (Platform.deviceWidth - 40) / 2;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
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
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(18),
          marginHorizontal: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(5),
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        input: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
          paddingVertical: Platform.SizeScale(10),
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
        comboBoxIcon: {
          fontSize: Platform.SizeScale(8),
          paddingRight: Platform.SizeScale(5),
          color: colors.darkGray,
          alignSelf: 'center',
          paddingBottom: Platform.SizeScale(2),
        },
        doctorList: {
          width: '100%',
        },
        medicalInfo: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        medicalInfoValue: {
          textAlign: 'right',
          paddingHorizontal: Platform.SizeScale(3),
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
    [colors, filterItemWidth],
  );
};

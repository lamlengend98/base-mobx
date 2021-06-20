import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleSymptomPicker = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '90%',
          height: Platform.SizeScale(500),
          backgroundColor: colors.white,
          borderBottomLeftRadius: Platform.SizeScale(20),
          borderBottomRightRadius: Platform.SizeScale(20),
          alignSelf: 'center',
          paddingHorizontal: Platform.SizeScale(20),
        },
        modalContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.blue,
          width: '90%',
          alignSelf: 'center',
          borderTopLeftRadius: Platform.SizeScale(20),
          borderTopRightRadius: Platform.SizeScale(20),
          paddingVertical: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(15),
          alignItems: 'center',
        },
        modalTitle: {
          fontWeight: 'bold',
          fontSize: Platform.SizeScale(15),
          color: colors.white,
        },
        inputBody: {
          borderBottomWidth: 0.5,
          width: '100%',
          marginBottom: Platform.SizeScale(5),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        },
        inputContainer: { width: '90%' },
        iconContainer: { width: '10%' },
        inputStyle: {
          height: Platform.SizeScale(40),
        },
        footer: {
          borderTopWidth: 1,
          paddingTop: Platform.SizeScale(15),
          borderColor: colors.darkGray,
        },
        buttonContainer: {
          bottom: 0,
          flexDirection: 'row',
          width: '65%',
          justifyContent: 'space-between',
          alignSelf: 'flex-end',
          marginBottom: Platform.SizeScale(15),
        },
        cancel: {
          paddingHorizontal: Platform.SizeScale(15),
          paddingVertical: Platform.SizeScale(10),
          backgroundColor: colors.darkGray2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(7),
          width: '47.5%',
        },
        cancelText: { fontSize: 15 },
        save: {
          paddingHorizontal: Platform.SizeScale(15),
          paddingVertical: Platform.SizeScale(10),
          backgroundColor: colors.blue,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(7),
          width: '47.5%',
        },
        saveText: { color: colors.white, fontSize: 15 },
        symptomItem: {
          paddingVertical: Platform.SizeScale(2),
          alignItems: 'center',
        },
        itemContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: Platform.SizeScale(10),
          borderRadius: Platform.SizeScale(5),
          borderWidth: 2,
        },
        checkboxContainer: {
          width: Platform.SizeScale(18),
          height: Platform.SizeScale(18),
          borderRadius: Platform.SizeScale(9),
          borderWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: colors.blue,
        },
        checkboxStyle: {
          width: Platform.SizeScale(7),
          height: Platform.SizeScale(7),
          borderRadius: Platform.SizeScale(3.5),
          backgroundColor: colors.blue,
        },
        unCheckbox: {
          width: Platform.SizeScale(18),
          height: Platform.SizeScale(18),
          borderRadius: Platform.SizeScale(9),
          borderWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: colors.darkGray,
        },
      }),
    [colors],
  );
};

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleAddCreditCard = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        input2InRow: { width: '47.5%', marginTop: 0 },
        allBackgroundWhite: { flex: 1, backgroundColor: colors.white },
        submitStyle: {
          borderRadius: Platform.SizeScale(5),
          backgroundColor: colors.blue,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Platform.SizeScale(10),
          marginHorizontal: Platform.SizeScale(10),
          marginTop: Platform.SizeScale(30),
        },
        margin0: { margin: 0 },
        margin15: { marginHorizontal: Platform.SizeScale(15) },
        marginB5: {
          marginBottom: Platform.SizeScale(5),
        },
        rowSpace: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        white15Text: {
          color: colors.white,
          fontSize: Platform.SizeScale(15),
        },
        patient: {
          backgroundColor: colors.blue,
        },
      }),
    [colors],
  );
};

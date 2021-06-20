import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStylePreConsultation = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.lightGray,
        },
        section: {
          marginTop: Platform.SizeScale(15),
          marginBottom: Platform.SizeScale(10),
          marginLeft: Platform.SizeScale(10),
        },
        input: {
          padding: Platform.SizeScale(),
          height: Platform.SizeScale(100),
          borderRadius: Platform.SizeScale(10),
          marginHorizontal: Platform.SizeScale(5),
          backgroundColor: colors.white,
          alignItems: 'flex-start',
          borderColor: colors.inputBorder,
          borderWidth: 0,
          flex: 1,
        },
        button: {
          marginTop: Platform.SizeScale(15),
          width: '40%',
          alignSelf: 'center',
          marginBottom: Platform.SizeScale(50),
        },
      }),
    [insets, colors],
  );
};

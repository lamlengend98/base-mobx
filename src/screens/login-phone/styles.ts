import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleLoginPhone = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
          padding: Platform.SizeScale(30),
          height: Platform.deviceHeight,
        },
        logo: {
          flex: 1,
          width: Platform.SizeScale(122),
          height: Platform.SizeScale(126),
        },
        buttonGroup: {
          flex: 1,
          width: '90%',
        },
        button: {
          marginVertical: Platform.SizeScale(15),
        },
        inputContainer: {
          alignItems: 'center',
          paddingHorizontal: Platform.SizeScale(20),
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(24),
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.gray,
        },
        input: {
          borderColor: 'transparent',
          flex: 1,
        },
        inputSearchAreacode: {
          borderWidth: 0,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderRadius: 0,
        },
        indicator: {
          width: 1,
          marginLeft: 15,
          height: 10,
          backgroundColor: colors.gray,
        },
        list: {
          backgroundColor: colors.white,
          position: 'absolute',
          zIndex: 999,
          height: Platform.SizeScale(200),
          borderColor: colors.gray,
          borderWidth: 0.5,
          left: Platform.SizeScale(50),
        },
      }),
    [colors, insets],
  );
};

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleMyProfile = () => {
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
          backgroundColor: colors.white,
        },
        list: {
          width: '100%',
          marginLeft: Platform.SizeScale(10),
        },
        keyValue: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: Platform.SizeScale(10),
          flex: 1,
        },
        icon: {
          width: Platform.SizeScale(60),
          fontSize: Platform.SizeScale(16),
          color: colors.darkGray,
          textAlign: 'center',
        },
        title: {
          fontSize: Platform.SizeScale(24),
          marginVertical: Platform.SizeScale(25),
        },
        text: {
          flex: 1,
          marginVertical: Platform.SizeScale(5),
        },
        blueText: {
          color: colors.blue,
        },
        redText: {
          color: colors.red,
        },
        blackText: {
          color: colors.black,
        },
        imageContainer: {
          width: Platform.SizeScale(60),
          alignItems: 'center',
          justifyContent: 'center',
        },
        image: {
          width: Platform.SizeScale(15),
          height: Platform.SizeScale(15),
        },
      }),
    [insets, colors],
  );
};

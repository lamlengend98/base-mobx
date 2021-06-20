import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStylePostConsultation = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return useMemo(
    () =>
      StyleSheet.create({
        awareScrollView: {
          width: Platform.deviceWidth,
          height: Platform.deviceHeight,
        },
        container: {
          alignItems: 'center',
          paddingTop: insets.top,
          paddingBottom: Platform.SizeScale(40) + insets.bottom,
        },
        circle1: {
          width: Platform.SizeScale(230),
          height: Platform.SizeScale(230),
          borderRadius: Platform.SizeScale(230) / 2,
          backgroundColor: Color(colors.gray, 'hex').alpha(0.25).toString(),
          justifyContent: 'center',
          alignItems: 'center',
        },
        circle2: {
          width: Platform.SizeScale(200),
          height: Platform.SizeScale(200),
          borderRadius: Platform.SizeScale(200) / 2,
          backgroundColor: Color(colors.gray, 'hex').alpha(0.5).toString(),
          justifyContent: 'center',
          alignItems: 'center',
        },
        circle3: {
          width: Platform.SizeScale(170),
          height: Platform.SizeScale(170),
          borderRadius: Platform.SizeScale(170) / 2,
          backgroundColor: Color(colors.gray, 'hex').alpha(1).toString(),
          justifyContent: 'center',
          alignItems: 'center',
        },
        avatar: {
          width: Platform.SizeScale(140),
          height: Platform.SizeScale(140),
          borderRadius: Platform.SizeScale(140) / 2,
          aspectRatio: 1,
        },
        title: {
          fontSize: Platform.SizeScale(24),
          textAlign: 'center',
          fontWeight: '700',
          marginVertical: Platform.SizeScale(52),
          marginHorizontal: Platform.SizeScale(50),
          color: colors.darkGray,
        },
        name: {
          marginTop: Platform.SizeScale(18),
          fontSize: Platform.SizeScale(24),
          color: colors.darkGray,
        },
        review: {
          fontSize: Platform.SizeScale(16),
          color: colors.darkGray,
          marginVertical: Platform.SizeScale(),
        },
        rate: {
          fontSize: Platform.SizeScale(32),
        },
        inputStyle: {
          height: Platform.deviceWidth / 3 - 12,
        },
        inputReview: {
          margin: Platform.SizeScale(),
          paddingHorizontal: Platform.SizeScale(12),
          height: Platform.deviceWidth / 3,
        },
        rateOnGroup: {
          flexDirection: 'row',
          paddingHorizontal: Platform.SizeScale(),
        },
        btnRate: {
          flex: 1,
          height: Platform.SizeScale(50),
          marginHorizontal: Platform.SizeScale(8),
        },
      }),
    [colors, insets.bottom, insets.top],
  );
};

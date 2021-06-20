import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'color';
import { COLORS, Platform, useTheme } from '@/theme';

export const useStyleAppBars = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          paddingTop: insets.top,
          backgroundColor: colors.white,
          paddingHorizontal: Platform.SizeScale(15),
        },
        container: {
          width: '100%',
          height: Platform.headerHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        shadow: {
          shadowColor: Color(COLORS.BLACK, 'hex').alpha(0.8).toString(),
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          elevation: 0.5,
        },
        leftContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: Platform.SizeScale(5),
        },
        rightContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: Platform.SizeScale(5),
        },
        btn: {
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: Platform.SizeScale(15),
        },
        btnBack: {
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: Platform.SizeScale(15),
        },
        avatar: {
          width: Platform.SizeScale(24),
          height: Platform.SizeScale(24),
          borderRadius: Platform.SizeScale(12),
          borderColor: colors.gray,
          borderWidth: Platform.SizeScale(1),
        },
        icon: {
          fontSize: Platform.SizeScale(20),
          color: colors.darkGray,
        },
        iconAvixo: {
          width: Platform.SizeScale(122),
          height: Platform.SizeScale(17),
        },
        title: {
          flex: 1,
          fontSize: Platform.SizeScale(24),
          fontWeight: '900',
        },
        notiContainer: {
          backgroundColor: colors.red,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          padding: Platform.SizeScale(2),
          paddingHorizontal: Platform.SizeScale(5),
          right: Platform.SizeScale(-10),
          top: Platform.SizeScale(Platform.OS === 'android' ? -10 : -5),
          borderRadius: Platform.SizeScale(5),
        },
        noti: { fontSize: 10, color: colors.white },
      }),
    [colors, insets],
  );
};

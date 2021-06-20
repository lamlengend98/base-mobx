import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleTabBar = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: Platform.SizeScale(55),
        },
        btnAction: {
          flex: 1,
          width: Platform.deviceWidth / 5,
          alignItems: 'center',
          justifyContent: 'center',
          height: Platform.SizeScale(45),
          zIndex: 1,
        },
        borderTab: {
          width: Platform.SizeScale(32),
          height: Platform.SizeScale(4),
          backgroundColor: colors.lightBlue,
          marginBottom: Platform.SizeScale(10),
        },
        vBorder: {
          backgroundColor: 'red',
          flex: 1,
        },
        btnViewEmpty: {
          width: Platform.deviceWidth / 5,
          height: Platform.SizeScale(35),
        },
        btnLogoAction: {
          width: Platform.SizeScale(54),
          height: Platform.SizeScale(54),
          borderRadius: Platform.SizeScale(54) / 2,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: Platform.SizeScale(64) / 2,
          left: Platform.deviceWidth / 2 - Platform.SizeScale(54) / 2,
          zIndex: 1,
        },
        iconAction: {
          fontSize: Platform.SizeScale(20),
          color: colors.iconTab,
          marginBottom: Platform.SizeScale(12),
        },
        iconLogo: {
          fontSize: Platform.isIpad()
            ? Platform.SizeScale(38)
            : Platform.SizeScale(28),
          color: colors.white,
          overflow: 'hidden',
          marginBottom: Platform.isIpad() ? Platform.SizeScale(10) : 0,
        },
        bgTab: {
          position: 'absolute',
          left: -Platform.SizeScale() / 2,
          zIndex: 0,
        },
        badge: {
          position: 'absolute',
          backgroundColor: 'red',
          top: 0,
          right: 10,
          width: Platform.SizeScale(20),
          height: Platform.SizeScale(20),
          borderRadius: Platform.SizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
        },
        textBadge: {
          fontSize: Platform.SizeScale(10),
          color: colors.white,
        },
      }),
    [colors.iconTab, colors.lightBlue, colors.white],
  );

  return {
    insets,
    styles,
  };
};

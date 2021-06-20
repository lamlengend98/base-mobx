import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStylesChatting = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        area: {
          flex: 1,
          backgroundColor: colors.white,
        },
        container: {
          flex: 1,
          marginBottom: Platform.SizeScale(26),
        },
        header: {
          alignItems: 'center',
        },
        message: {
          marginVertical: Platform.SizeScale(),
        },
        circle: {
          width: Platform.SizeScale(150),
          height: Platform.SizeScale(150),
          borderRadius: Platform.SizeScale(150) / 2,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: Color(colors.gray, 'hex').alpha(0.25).toString(),
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          elevation: 3,
        },
        avatar: {
          width: Platform.SizeScale(150),
          height: Platform.SizeScale(150),
          borderRadius: Platform.SizeScale(150) / 2,
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
          fontWeight: '700',
        },
        role: {
          fontSize: Platform.SizeScale(18),
          color: colors.darkGray,
        },
        started: {
          fontSize: Platform.SizeScale(12),
          color: colors.gray,
          marginVertical: Platform.SizeScale(18),
        },
        rate: {
          fontSize: Platform.SizeScale(24),
          marginTop: Platform.SizeScale(),
        },
        contentChat: {
          paddingVertical: Platform.SizeScale(),
        },
        indicator: {
          flex: 1,
        },
        actionButtonIcon: {
          fontSize: Platform.SizeScale(22),
          height: Platform.SizeScale(22),
          color: 'white',
        },
      }),
    [colors],
  );
  return {
    styles,
    insets,
  };
};

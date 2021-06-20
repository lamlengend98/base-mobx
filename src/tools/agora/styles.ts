import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStyleAgora = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          margin: 0,
          padding: 0,
          backgroundColor: colors.bgCall,
        },
        content: {
          width: Platform.deviceWidth,
          height: Platform.deviceHeight,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        },
        header: {
          width: Platform.deviceWidth,
          alignItems: 'center',
          padding: Platform.SizeScale(3),
        },
        iAvixo: {
          width: Platform.deviceWidth * 0.3,
        },
        max: {
          flexGrow: 1,
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(20),
          marginHorizontal: Platform.SizeScale(8),
          marginBottom: Platform.SizeScale(6),
        },
        vCamera: {
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(20),
          marginHorizontal: Platform.SizeScale(8),
          marginBottom: Platform.SizeScale(6),
          shadowColor: Color(colors.black, 'hex').alpha(0.5).toString(),
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 1,
          elevation: 0.5,
          overflow: 'hidden',
        },
        remoteContainer: {
          width: Platform.deviceWidth / 3,
          height: Platform.deviceWidth / 2,
          position: 'absolute',
          right: Platform.SizeScale(),
          left: Platform.SizeScale(18),
          borderRadius: Platform.SizeScale(),
          bottom: insets.bottom + Platform.SizeScale(45),
        },
        remoteContainerStyle: {
          paddingHorizontal: Platform.SizeScale(6),
        },
        remote: {
          width: Platform.deviceWidth / 3,
          height: Platform.deviceWidth / 2,
        },
        btnEndCall: {
          position: 'absolute',
          top: insets.top + Platform.SizeScale(),
          right: Platform.SizeScale(),
          backgroundColor: 'white',
          borderColor: colors.darkGray,
          padding: Platform.SizeScale(),
          borderRadius: Platform.SizeScale(6),
        },
        indicator: {
          flex: 1,
        },
        indicatorColor: {
          color: 'red',
        },
        actions: {
          position: 'absolute',
          flexDirection: 'row',
          height: Platform.SizeScale(60),
          width: Platform.deviceWidth,
          bottom: insets.bottom + Platform.SizeScale(20),
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: Platform.SizeScale(20),
        },
        actionIcon: {
          width: Platform.SizeScale(55),
          fontSize: Platform.SizeScale(22),
          textShadowColor: Color(colors.black, 'hex').alpha(0.3).toString(),
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 0.5,
          shadowOpacity: 0.8,
          elevation: 0.8,
          color: colors.white,
        },
        actionPhone: {
          width: Platform.SizeScale(55),
          height: Platform.SizeScale(55),
          borderRadius: Platform.SizeScale(56) / 2,
          backgroundColor: colors.bgActionPhone,
          justifyContent: 'center',
          alignItems: 'center',
        },
        actionPhoneIcon: {
          fontSize: Platform.SizeScale(20),
          textShadowColor: Color(colors.black, 'hex').alpha(0.3).toString(),
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
          color: colors.white,
          transform: [{ rotate: '137deg' }],
        },
        dropdown: {
          backgroundColor: colors.yellow,
        },
      }),
    [colors, insets],
  );
};

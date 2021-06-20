import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleCallDoctor = () => {
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();

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
        contentContainer: {
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: Platform.SizeScale(15),
        },
        avatarContainer: {
          width: Platform.SizeScale(176),
          height: Platform.SizeScale(176),
          borderRadius: Platform.SizeScale(88),
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 2,
          marginBottom: Platform.SizeScale(10),
        },
        avatar: {
          width: Platform.SizeScale(176),
          height: Platform.SizeScale(176),
          borderRadius: Platform.SizeScale(88),
        },
        name: {
          fontSize: Platform.SizeScale(24),
          fontWeight: '500',
        },
        category: {
          fontSize: Platform.SizeScale(18),
        },
        rating: {
          fontSize: Platform.SizeScale(15),
          marginVertical: Platform.SizeScale(10),
        },
        section: {
          ...typography.boldSfPro,
          alignSelf: 'flex-start',
          textAlign: 'left',
          marginTop: Platform.SizeScale(10),
        },
        description: {
          alignSelf: 'flex-start',
          textAlign: 'left',
        },
        action: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        actionLeft: {
          flex: 1,
          flexDirection: 'row',
          borderWidth: Platform.SizeScale(1),
          borderRadius: Platform.SizeScale(48),
          marginRight: Platform.SizeScale(10),
          padding: Platform.SizeScale(2),
          borderColor: colors.lightGreen,
        },
        actionDetails: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: Platform.SizeScale(72),
          width: '60%',
        },
        iconCostContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: Platform.SizeScale(72),
          height: Platform.SizeScale(72),
          borderRadius: Platform.SizeScale(36),
          backgroundColor: colors.blue,
        },
        iconCallContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: Platform.SizeScale(64),
          height: Platform.SizeScale(64),
          borderRadius: Platform.SizeScale(32),
          backgroundColor: colors.lightGreen,
        },
        iconCall: {
          fontSize: Platform.SizeScale(18),
          color: colors.white,
        },
        iconCost: {
          fontSize: Platform.SizeScale(45),
          color: colors.white,
        },
        details: {
          marginVertical: Platform.SizeScale(5),
          textAlign: 'left',
        },
        costLabelContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
        costLabel: {
          fontSize: Platform.SizeScale(18),
          color: colors.white,
        },
        profileContainer: {
          width: Platform.deviceWidth - Platform.SizeScale(40),
          paddingBottom: Platform.SizeScale(40),
        },
      }),
    [insets, colors, typography],
  );
};

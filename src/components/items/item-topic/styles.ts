import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemTopic = () => {
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(10),
        },
        detailsContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        },
        avatar: {
          height: Platform.SizeScale(150),
          alignItems: 'flex-end',
          borderTopLeftRadius: Platform.SizeScale(10),
          borderTopRightRadius: Platform.SizeScale(10),
        },
        name: {
          ...typography.boldRoboto,
          color: colors.white,
          fontSize: Platform.SizeScale(20),
          marginRight: Platform.SizeScale(8),
          width: Platform.SizeScale(150),
          textAlign: 'right',
          shadowColor: colors.darkGray,
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          elevation: 0.5,
        },
        description: {
          ...typography.mediumRoboto,
          marginLeft: Platform.SizeScale(10),
          marginVertical: Platform.SizeScale(5),
        },
        overlay: {
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          backgroundColor: colors.overlayTopic,
        },
      }),
    [colors, typography],
  );
};

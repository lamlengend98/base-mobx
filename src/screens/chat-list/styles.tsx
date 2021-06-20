import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStylesChatList = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.lightGray2,
          padding: Platform.SizeScale(),
        },
        search: {
          borderRadius: Platform.SizeScale(24),
          marginBottom: Platform.SizeScale(9),
          height: Platform.SizeScale(36),
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        inputSearch: {
          textAlign: 'left',
          fontSize: Platform.SizeScale(12),
          fontWeight: '400',
          width: '75%',
        },
        separator: {
          height: Platform.SizeScale(9),
        },
        emptyStyle: {
          alignSelf: 'center',
          marginTop: 10,
        },
        emptyText: {
          fontSize: Platform.SizeScale(16),
          fontWeight: '500',
        },
        iconContainer: {
          width: '25%',
          alignItems: 'flex-end',
        },
      }),
    [colors],
  );
};

export const useStylesConversation = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(),
          overflow: 'hidden',
          flexDirection: 'row',
          padding: Platform.SizeScale(),
          marginVertical: Platform.SizeScale(3),
          alignItems: 'center',
        },
        vAvatar: {
          borderRadius: Platform.SizeScale(50) / 2,
          backgroundColor: colors.white,
          shadowColor: Color(colors.black, 'hex').alpha(0.5).toString(),
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          elevation: 1,
          overflow: 'hidden',
          width: Platform.SizeScale(50),
          height: Platform.SizeScale(50),
        },
        avatar: {
          width: '100%',
          height: '100%',
        },
        content: {
          flex: 1,
          paddingHorizontal: Platform.SizeScale(6),
          justifyContent: 'space-between',
          paddingVertical: Platform.SizeScale(3),
        },
        name: {
          // fontWeight: '700',
          marginBottom: Platform.SizeScale(5),
        },
        nameUnread: {
          color: colors.blue,
          marginBottom: Platform.SizeScale(5),
        },
        msg: {
          fontSize: Platform.SizeScale(12),
          color: colors.black,
        },
        badge: {
          backgroundColor: colors.red,
          borderRadius: Platform.SizeScale(6),
          color: colors.white,
          fontSize: Platform.SizeScale(12),
          textAlign: 'center',
          overflow: 'hidden',
          alignSelf: 'flex-end',
          paddingHorizontal: Platform.SizeScale(10),
        },
        footer: {
          justifyContent: 'space-between',
          height: '100%',
          paddingVertical: Platform.SizeScale(3),
          position: 'absolute',
          right: 0,
        },
        loadingLastMessage: {
          alignItems: 'flex-start',
        },
        indicator: {
          padding: 0,
        },
        indicatorColor: {
          color: colors.blue,
        },
      }),
    [colors],
  );
};

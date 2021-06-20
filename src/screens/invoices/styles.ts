import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleInvoices = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        },
        searchIcon: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        inputSearch: {
          textAlign: 'center',
        },
        input: {
          borderColor: 'transparent',
          paddingHorizontal: Platform.SizeScale(),
          marginHorizontal: Platform.SizeScale(),
          marginVertical: Platform.SizeScale(),
        },
        filterContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginVertical: Platform.SizeScale(6),
        },
        filter: {
          paddingVertical: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(5),
          backgroundColor: colors.white,
          paddingHorizontal: Platform.SizeScale(),
          margin: Platform.SizeScale(3),
          borderRadius: Platform.SizeScale(24),
          flexDirection: 'row',
          alignItems: 'center',
        },
        deleteIcon: {
          fontSize: Platform.SizeScale(8),
          marginLeft: Platform.SizeScale(6),
          color: colors.darkGray,
        },
        doctorList: {
          width: '100%',
        },
        invoices: {
          flexDirection: 'row',
          backgroundColor: colors.white,
          paddingVertical: Platform.SizeScale(6),
          paddingHorizontal: Platform.SizeScale(),
          marginBottom: 1,
        },
        types: {
          width: Platform.SizeScale(45),
          height: Platform.SizeScale(45),
          borderRadius: Platform.SizeScale(45) / 2,
          borderColor: colors.gray,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        },
        iconType: {
          fontSize: Platform.SizeScale(18),
          color: colors.blue,
        },
        success: {
          color: colors.lightGreen,
        },
        status: {
          position: 'absolute',
          color: colors.lightGreen,
          fontSize: Platform.SizeScale(18),
          bottom: Platform.SizeScale(-4),
          right: Platform.SizeScale(-4),
        },
        cancel: {
          position: 'absolute',
          color: colors.red,
          fontSize: Platform.SizeScale(18),
          bottom: Platform.SizeScale(-4),
          right: Platform.SizeScale(-4),
        },
        body: {
          flexGrow: 1,
          flexDirection: 'row',
        },
        content: {
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: Platform.SizeScale(),
        },
        footer: {
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        },
        action: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        actionView: {
          color: colors.black,
          fontSize: Platform.SizeScale(14),
        },
        iconRight: {
          color: colors.black,
          fontSize: Platform.SizeScale(8),
          marginLeft: Platform.SizeScale(3),
          marginTop: Platform.SizeScale(3),
        },
        amount: {
          color: colors.black,
          fontSize: Platform.SizeScale(18),
        },
        name: {
          color: colors.blue,
          fontSize: Platform.SizeScale(13),
        },
        time: {
          color: colors.black,
          fontSize: Platform.SizeScale(11),
          marginVertical: Platform.SizeScale(3),
        },
        type: {
          color: colors.black,
          fontSize: Platform.SizeScale(11),
        },
        list: {
          width: '100%',
        },
        bodyContainer: {
          flex: 1,
          paddingBottom: Platform.SizeScale(20),
        },
        emptyStyle: {
          alignSelf: 'center',
          marginTop: 10,
        },
        emptyText: {
          fontSize: Platform.SizeScale(16),
        },
      }),
    [insets, colors],
  );
};

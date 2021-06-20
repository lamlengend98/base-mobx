import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStyleInvoicesDetail = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: Platform.SizeScale(19),
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottomWidth: 1,
          borderBottomColor: colors.sliverChalice,
          paddingVertical: Platform.SizeScale(9),
        },
        logo: {
          width: Platform.SizeScale(160),
        },
        order: {
          color: colors.darkGray,
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        issue: {
          color: colors.darkGray,
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        invoice: {
          flexDirection: 'row',
          marginVertical: Platform.SizeScale(9),
        },
        from: {
          flex: 1,
        },
        to: {
          flex: 1,
        },
        invoiceTitle: {
          fontSize: Platform.SizeScale(12),
          fontWeight: '400',
          color: colors.black,
        },
        invoiceNameFrom: {
          fontSize: Platform.SizeScale(12),
          fontWeight: '700',
          color: colors.blue,
          marginTop: Platform.SizeScale(5),
        },
        invoiceNameTo: {
          fontSize: Platform.SizeScale(12),
          fontWeight: '700',
          color: colors.darkGray,
          marginTop: Platform.SizeScale(5),
        },
        method: {
          marginBottom: Platform.SizeScale(9),
        },
        methodTitle: {
          fontSize: Platform.SizeScale(),
          fontWeight: '700',
        },
        descriptionTitle: {
          fontSize: Platform.SizeScale(),
          fontWeight: '700',
          marginBottom: Platform.SizeScale(10),
        },
        card: {
          width: '100%',
          borderRadius: Platform.SizeScale(),
          overflow: 'hidden',
          marginVertical: Platform.SizeScale(9),
        },
        cardHeader: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        visaText: {
          color: colors.white,
          marginLeft: Platform.SizeScale(),
          fontSize: Platform.SizeScale(23),
        },
        cardBody: {
          margin: Platform.SizeScale(24),
        },
        cardNumber: {
          fontSize: Platform.SizeScale(28),
          marginVertical: Platform.SizeScale(8),
          color: colors.white,
        },
        cardExpiration: {
          fontSize: Platform.SizeScale(13),
          color: colors.white,
        },
        descriptionHeader: {
          flexDirection: 'row',
          marginTop: Platform.SizeScale(9),
          paddingBottom: Platform.SizeScale(9),
          borderBottomWidth: 1,
          borderBottomColor: Color(colors.sliverChalice, 'hex')
            .alpha(0.6)
            .toString(),
        },
        headerDes: {
          flex: 3,
          textTransform: 'uppercase',
          fontWeight: '700',
          color: colors.darkGray,
          fontSize: Platform.SizeScale(12),
        },
        headerOff: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        headerVat: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        headerTotal: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        descriptionBody: {
          flexDirection: 'row',
          paddingVertical: Platform.SizeScale(9),
          borderBottomWidth: 1,
          borderBottomColor: Color(colors.sliverChalice, 'hex')
            .alpha(0.6)
            .toString(),
        },
        bodyDes: {
          flex: 3,
          color: colors.darkGray,
          fontSize: Platform.SizeScale(12),
        },
        bodyOff: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        bodyVat: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        bodyTotal: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        descriptionFooter: {
          flexDirection: 'row',
          marginVertical: Platform.SizeScale(9),
        },
        footerDes: {
          flex: 3,
          textTransform: 'uppercase',
          fontWeight: '700',
          color: colors.darkGray,
          fontSize: Platform.SizeScale(12),
        },
        footerOff: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        footerVat: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        footerTotal: {
          flex: 1,
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
          textAlign: 'right',
        },
        footerContent: {
          flexDirection: 'row',
        },
        footerContentBody: {
          flexGrow: 1,
        },
        note: {
          width: '50%',
          color: colors.darkGray,
          fontSize: Platform.SizeScale(12),
        },
        footerContentBodyTop: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        totalText: {
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(12),
        },
        amount: {
          color: colors.darkGray,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: Platform.SizeScale(14),
        },
        amountTotal: {
          flexDirection: 'column',
          alignItems: 'flex-end',
          marginTop: Platform.SizeScale(10),
        },
      }),
    [colors],
  );
};

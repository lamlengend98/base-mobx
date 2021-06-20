import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Image, ScrollView, View } from 'react-native';
import { observer } from 'mobx-react';
import moment from 'moment';
import { LogoHorizontal } from '@/assets';
import { AppBars, Text } from '@/components';
import { useAppStore } from '@/hooks';
import { InvoiceDetail, InvoiceInfo } from '@/models/types';
import { CardItem } from '../credit-card/card-item';
import { useStyleInvoicesDetail } from './styles';

interface InvoiceDetailProps {
  route?: any;
}

export const InvoicesDetail = observer(({ route }: InvoiceDetailProps) => {
  const styles = useStyleInvoicesDetail();
  const { formatMessage } = useIntl();
  const { payment } = useAppStore();
  const invoice: InvoiceInfo = route?.params?.invoice;

  useEffect(() => {
    payment.getCard();
  }, [payment]);

  const issued = moment(invoice?.createdAt).lang('en').format('MMM Do YYYY');
  let total = +invoice?.amount;
  let totalVat = 0;
  if (invoice?.details?.length > 0) {
    invoice?.details?.map((item: InvoiceDetail) => {
      total += parseInt(item.amount, 10);
      totalVat += +item.vat;
    });
  }
  return (
    <>
      <AppBars title={formatMessage({ id: 'app.invoices_detail' })} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            source={LogoHorizontal}
            style={styles.logo}
          />
          <View>
            <Text style={styles.issue}>
              {formatMessage(
                { id: 'app.order_code' },
                { orderCode: invoice?.id },
              )}
            </Text>
            <Text style={styles.issue}>
              {formatMessage({ id: 'app.issued' }, { issued })}
            </Text>
          </View>
        </View>
        <View style={styles.invoice}>
          <View style={styles.from}>
            <Text style={styles.invoiceTitle}>
              {formatMessage({ id: 'app.invoice_from' })}
            </Text>
            <Text style={styles.invoiceNameFrom}>
              {invoice?.doctor?.firstName &&
                `${invoice?.doctor?.firstName.trim()} `}
              {invoice?.doctor?.lastName && invoice?.doctor?.lastName.trim()}
            </Text>
          </View>
          <View style={styles.to}>
            <Text style={styles.invoiceTitle}>
              {formatMessage({ id: 'app.invoice_to' })}
            </Text>
            <Text style={styles.invoiceNameTo}>
              {invoice?.patient?.firstName &&
                `${invoice?.patient?.firstName.trim()} `}
              {invoice?.patient?.lastName &&
                `${invoice?.patient?.lastName.trim()} `}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.descriptionTitle}>
            {formatMessage({ id: 'app.payment_method' })}
          </Text>
          {payment.creditCard?.length > 0 && (
            <CardItem noBorder item={payment.creditCard?.[0]} />
          )}
        </View>
        <View>
          <Text style={styles.methodTitle}>
            {formatMessage({ id: 'app.invoices_description' })}
          </Text>
          <View style={styles.descriptionHeader}>
            <Text style={styles.headerDes}>
              {formatMessage({ id: 'app.description' })}
            </Text>
            <Text style={styles.headerOff}> </Text>
            <Text style={styles.headerVat}>
              {formatMessage({ id: 'app.invoices_vat' })}
            </Text>
            <Text style={styles.headerTotal}>
              {formatMessage({ id: 'app.invoices_total' })}
            </Text>
          </View>
          <View style={styles.descriptionBody}>
            <Text style={styles.bodyDes}>{invoice?.type}</Text>
            <Text style={styles.bodyOff}> </Text>
            <Text style={styles.bodyVat}>$0</Text>
            <Text style={styles.bodyTotal}>${invoice?.amount}</Text>
          </View>
          {invoice?.details?.length > 0 &&
            invoice?.details?.map((item: InvoiceDetail) => {
              return (
                <View style={styles.descriptionBody}>
                  <Text style={styles.bodyDes}>{item?.description}</Text>
                  <Text style={styles.bodyOff}> </Text>
                  <Text style={styles.bodyVat}>${item?.vat}</Text>
                  <Text style={styles.bodyTotal}>${item?.amount}</Text>
                </View>
              );
            })}
          <View style={styles.descriptionFooter}>
            <Text style={styles.footerDes}>
              {formatMessage({ id: 'app.invoices_note' })}
            </Text>
            <Text style={styles.footerOff}>
              {formatMessage({ id: 'app.invoices_off' })}
            </Text>
            <Text style={styles.footerVat}>
              {formatMessage({ id: 'app.invoices_vat' })}
            </Text>
            <Text style={styles.footerTotal}>
              {formatMessage({ id: 'app.invoices_sub' })}
            </Text>
          </View>
          <View style={styles.footerContent}>
            <Text style={styles.note}>{invoice?.note}</Text>
            <View style={styles.footerContentBody}>
              <View style={styles.footerContentBodyTop}>
                <Text style={styles.bodyOff}>0%</Text>
                <Text style={styles.bodyVat}>${totalVat}</Text>
                <Text style={styles.bodyTotal}>${total}</Text>
              </View>
              <View style={styles.amountTotal}>
                <Text style={styles.totalText}>
                  {formatMessage({ id: 'app.amount_total' })}
                </Text>
                <Text style={styles.amount}>${+total + +totalVat}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
});

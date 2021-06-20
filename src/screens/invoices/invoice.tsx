import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import moment from 'moment';
import { Icon65doctor } from '@/assets';
import { Text, Touchable } from '@/components';
import { InvoiceDetail } from '@/models/types';
import { Platform } from '@/theme';
import { useStyleInvoices } from './styles';
import { InvoiceProps } from './types';

export const Invoices = ({ item, onPress }: InvoiceProps) => {
  const styles = useStyleInvoices();
  const { formatMessage, formatNumber } = useIntl();

  const renderTime = (time: string, format1: string, format2: string) => {
    return (
      moment(time).lang('en').format(format1) +
      ' ' +
      moment(time).lang('en').format(format2).toUpperCase()
    );
  };

  let total = +item?.amount;
  if (item?.details?.length > 0) {
    item?.details?.map((detail: InvoiceDetail) => {
      total += +detail.amount;
      total += +detail.vat;
    });
  }

  const onItemPress = useCallback(() => {
    return onPress && onPress(item);
  }, [item, onPress]);

  return (
    <Touchable onPress={onItemPress} style={styles.invoices}>
      <View style={styles.types}>
        <View>
          <Icon65doctor
            name={
              item?.type === 'CALL'
                ? Icon65doctor.icons.VIDEO_CALL
                : Icon65doctor.icons.MESSAGE
            }
            style={[
              styles.iconType,
              item?.type === 'CHAT' && {
                fontSize: Platform.SizeScale(20),
              },
            ]}
          />
        </View>
        <Icon65doctor
          name={
            Icon65doctor.icons[
              item?.status === 'COMPLETED' ? 'CIRCLE_CHECK' : 'OFF_CLOSE'
            ]
          }
          style={item?.status === 'COMPLETED' ? styles.status : styles.cancel}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.content}>
          <Text fontType="BOLD_SF" numberOfLines={1} style={styles.name}>
            {item?.doctor?.firstName} {item?.doctor?.lastName}
          </Text>
          <Text style={styles.time}>
            {renderTime(item?.createdAt, 'MMM Do', 'ddd - HH:mm')}
          </Text>
          <Text style={styles.type}>
            {formatMessage({
              id: item?.type === 'CALL' ? 'video_call' : 'chat',
            })}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text fontType="BOLD_SF" style={styles.amount}>
            ${formatNumber(total)}
          </Text>
          <View style={styles.action}>
            <Text style={styles.actionView}>View</Text>
            <Icon65doctor
              name={Icon65doctor.icons.ARROW_RIGHT}
              style={styles.iconRight}
            />
          </View>
        </View>
      </View>
    </Touchable>
  );
};

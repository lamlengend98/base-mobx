import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import moment from 'moment';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Button } from '@/components/elements';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { UpdateStatusCall } from '@/models/types';
import { NotificationProps } from '@/types/notification';
import { Text } from '../text';
import { NOTIFICATION_TYPES } from './constants';
import { useStylesItemNotification } from './styles';

const _NotificationItem = ({ item, onActionPress }: NotificationProps) => {
  const styles = useStylesItemNotification();
  const { formatMessage } = useIntl();
  console.log('====================================');
  console.log('item', item);
  console.log('====================================');

  const onCallbackPress = useCallback(() => {
    return item && onActionPress?.(item, 'CALLBACK');
  }, [onActionPress, item]);

  const renderCallbackRequestItem = useMemo(() => {
    const title =
      item?.data?.status === UpdateStatusCall.CHANNEL_CLOSED
        ? `Completed call from ${item?.data?.sender_name?.trim()}`
        : `Requesting call back from ${item?.data?.sender_name?.trim()}`;
    const time = moment(item?.data?.date_appointment).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    return (
      <>
        <View style={styles.content}>
          <Text fontType={'MEDIUM_SF'} style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text fontType={'THIN_RB'} style={styles.time} numberOfLines={2}>
            {time}
          </Text>
        </View>

        <Button
          style={styles.button}
          labelColor={'black'}
          buttonStyle={BUTTON_STYLES.BLUE}
          label={formatMessage({ id: 'call_back' })}
          onPress={onCallbackPress}
        />
      </>
    );
  }, [
    formatMessage,
    item?.data?.date_appointment,
    item?.data?.sender_name,
    item?.data?.status,
    onCallbackPress,
    styles.button,
    styles.content,
    styles.time,
    styles.title,
  ]);

  const renderAppointmentItem = useMemo(() => {
    const timeAppointment = moment(item?.data?.date_appointment).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    const time = moment(
      item?.data?.date_appointment,
      'YYYY-MM-DD HH:mm:ss',
    ).fromNow();
    console.log('====================================');
    console.log('time', time);
    console.log('====================================');
    const have = time.includes('ago') ? 'had' : 'have';
    return (
      <>
        <View style={styles.content}>
          <Text fontType={'MEDIUM_SF'} style={styles.title} numberOfLines={2}>
            {formatMessage({ id: 'app.notify.appointment' }, { time, have })}
          </Text>
          <Text fontType={'THIN_RB'} style={styles.time} numberOfLines={2}>
            {timeAppointment}
          </Text>
        </View>
      </>
    );
  }, [formatMessage, item, styles]);

  const renderContent = useMemo(() => {
    switch (item?.type) {
      case NOTIFICATION_TYPES.CALLBACK_REQUEST:
        return renderCallbackRequestItem;
      case NOTIFICATION_TYPES.APPOINTMENT:
        return renderAppointmentItem;
    }
  }, [item?.type, renderCallbackRequestItem, renderAppointmentItem]);

  const notificationIcon = useMemo(() => {
    switch (item?.type) {
      case NOTIFICATION_TYPES.CALLBACK_REQUEST:
        return ICONS.VIDEO_CALL;
      case NOTIFICATION_TYPES.APPOINTMENT:
        return ICONS.PLUS;
      default:
        return ICONS.PLUS;
    }
  }, [item?.type]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon65doctor name={notificationIcon} style={styles.icon} />
      </View>
      {renderContent}
    </View>
  );
};

export const NotificationItem = React.memo(_NotificationItem);

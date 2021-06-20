import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Button } from '@/components/elements';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { NotificationProps } from '@/types/notification';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { NOTIFICATION_TYPES } from './constants';
import { useStylesItemNotification } from './styles';

const _NotificationItem = ({ item, onActionPress }: NotificationProps) => {
  const styles = useStylesItemNotification();
  const { formatMessage } = useIntl();

  const onItemPress = useCallback(() => {
    return item && onActionPress?.(item, 'VIEW_DETAILS');
  }, [onActionPress, item]);

  const onCallbackPress = useCallback(() => {
    return item && onActionPress?.(item, 'CALLBACK');
  }, [onActionPress, item]);

  const renderCallbackRequestItem = useMemo(() => {
    return (
      <>
        <View style={styles.content}>
          <Text fontType={'MEDIUM_SF'} style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
          <Text fontType={'THIN_RB'} style={styles.time} numberOfLines={2}>
            {item?.time}
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
    item?.time,
    item?.title,
    onCallbackPress,
    styles.button,
    styles.content,
    styles.time,
    styles.title,
  ]);

  const renderSimpleItem = useMemo(() => {
    return (
      <>
        <View style={styles.content}>
          <Text fontType={'MEDIUM_SF'} style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
      </>
    );
  }, [item?.title, styles.content, styles.title]);

  const renderContent = useMemo(() => {
    switch (item?.type) {
      case NOTIFICATION_TYPES.CALLBACK_REQUEST:
        return renderCallbackRequestItem;
      case NOTIFICATION_TYPES.NEW_PATIENT:
      default:
        return renderSimpleItem;
    }
  }, [item?.type, renderCallbackRequestItem, renderSimpleItem]);

  const notificationIcon = useMemo(() => {
    switch (item?.type) {
      case NOTIFICATION_TYPES.CALLBACK_REQUEST:
        return ICONS.VIDEO_CALL;
      case NOTIFICATION_TYPES.NEW_PATIENT:
      default:
        return ICONS.PLUS;
    }
  }, [item?.type]);

  return (
    <Touchable style={styles.container} onPress={onItemPress}>
      <View style={styles.iconContainer}>
        <Icon65doctor name={notificationIcon} style={styles.icon} />
      </View>
      {renderContent}
    </Touchable>
  );
};

export const NotificationItem = React.memo(_NotificationItem);

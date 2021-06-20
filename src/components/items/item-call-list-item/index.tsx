import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Image, View } from 'react-native';
import moment from 'moment';
import { CallListProps } from '@/types/call-list';
import { getDisplayedAvatar } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemNotification } from './styles';

const _CallListItem = ({ item, onCallbackPress }: CallListProps) => {
  const styles = useStylesItemNotification();
  const { formatMessage } = useIntl();

  const _onCallbackPress = useCallback(() => {
    return item && onCallbackPress?.(item);
  }, [onCallbackPress, item]);

  const renderTime = (time: string) => {
    return moment(time).format('YYYY-MM-DD HH:mm:ss') || '';
  };

  const renderCallTime = () => {
    const startTime = moment(item?.startTime);
    const endTime = moment(item?.endTime);
    const seconds = endTime.diff(startTime, 'seconds');
    const minutes = Math.floor(seconds / 60);
    const remainderSecond = seconds - minutes * 60;
    console.log('seconds', seconds);
    return `${minutes}’${
      remainderSecond > 10 ? remainderSecond : '0' + remainderSecond
    }’’`;
  };

  return (
    <Touchable style={styles.container} onPress={_onCallbackPress}>
      <View style={styles.vAvatar}>
        <Image
          style={styles.avatar}
          source={getDisplayedAvatar(item?.receiver?.image)}
        />
      </View>
      <View style={styles.content}>
        <Text fontType={'BOLD_SF'} style={styles.title} numberOfLines={2}>
          {item?.receiver?.firstName} {item?.receiver?.lastName}
        </Text>
        <Text fontType={'BOLD_SF'} style={styles.callTime}>
          {renderTime(item?.createdAt || '')}
        </Text>
        <Text style={styles.description}>
          {!item?.startTime || !item?.endTime
            ? formatMessage({ id: 'app.call_not_completed' })
            : formatMessage({ id: 'call_time' }) + ' ' + renderCallTime()}
        </Text>
      </View>
    </Touchable>
  );
};

export const CallListItem = React.memo(_CallListItem);

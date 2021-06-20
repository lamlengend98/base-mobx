import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { toJS } from 'mobx';
import moment from 'moment';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppointmentProps } from '@/types/appointment';
import { getDisplayedAvatar } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemAppointment } from './styles';

const LONG_TEXT = 34;
const _AppointmentItem = ({ item, onPress }: AppointmentProps) => {
  console.log('====================================');
  console.log('item', toJS(item));
  console.log('====================================');
  const styles = useStylesItemAppointment();
  const { formatMessage } = useIntl();
  const time = moment(item?.date_appointment).format('HH:mm');
  const day = moment(item?.date_appointment).format('dddd');
  const date = moment(item?.date_appointment).format('DD');
  const month = moment(item?.date_appointment).format('MMMM');

  const _onPress = useCallback(() => {
    return item && onPress?.(item);
  }, [onPress, item]);

  const timeContainerStyle = useMemo(() => {
    return item?.type === formatMessage({ id: 'upcoming' })
      ? styles.upcomingTimeContainer
      : styles.endedTimeContainer;
  }, [
    formatMessage,
    item?.type,
    styles.endedTimeContainer,
    styles.upcomingTimeContainer,
  ]);

  const timeStyle = useMemo(() => {
    return item?.type === formatMessage({ id: 'upcoming' })
      ? styles.upcomingTime
      : styles.endedTime;
  }, [formatMessage, item?.type, styles.endedTime, styles.upcomingTime]);

  const doctorAvatar = useMemo(() => {
    return getDisplayedAvatar(item?.doctor_picture);
  }, [item?.doctor_picture]);

  const doctorDetail = useMemo(() => {
    const exp =
      +moment().format('YYYY') - (item?.doctor_profile?.doctor_age || 0);
    const exp_yr = `${exp} yr${exp && exp > 1 ? 's' : ''} exp`;
    return `${item?.doctor_profile?.specialty}, ${exp_yr}`;
  }, [item?.doctor_profile?.doctor_age, item?.doctor_profile?.specialty]);

  return (
    <Touchable activeOpacity={1} style={styles.container} onPress={_onPress}>
      <View style={{ width: '33.3%' }}>
        <FastImage
          source={doctorAvatar}
          resizeMode="cover"
          style={styles.avatar}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '66.6%',
          justifyContent: 'space-between',
        }}>
        <View style={styles.detailsContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {item?.doctor}
          </Text>
          <Text
            isViewHtml
            showMore={doctorDetail.length > LONG_TEXT}
            style={styles.description}
            numberOfLines={2}>
            {doctorDetail}
          </Text>
          <Text isViewHtml style={styles.description} numberOfLines={2}>
            {item?.address?.trim()}
          </Text>
        </View>

        <View
          style={{
            width: '45%',
            alignItems: 'center',
          }}>
          <View style={timeContainerStyle}>
            <View style={styles.row}>
              <Icon65doctor name={ICONS.CLOCK} style={styles.icon} />
              <Text fontType={'MEDIUM_SF'} style={timeStyle}>
                {time}
              </Text>
            </View>
            <Text style={styles.dayOfWeek}>{day}</Text>
            <View style={styles.row}>
              <Text fontType={'MEDIUM_SF'}>{date}</Text>
              <Text fontType={'THIN_RB'}>{month}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export const AppointmentItem = React.memo(_AppointmentItem);

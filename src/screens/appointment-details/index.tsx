import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Alert, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { debounce } from 'lodash';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, Button, Text, TextField } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { Rate } from '@/components/elements/rating';
import { useAppStore } from '@/hooks';
import { NotificationParam } from '@/models/types';
import { ROUTES } from '@/stack';
import { getAppointmentTime } from '@/utils';
import { useStyleAppointmentDetails } from './styles';
import { AppointmentDetailPropsScreen } from './types';

export const AppointmentDetailsScreen = ({
  route,
  navigation,
}: AppointmentDetailPropsScreen) => {
  const styles = useStyleAppointmentDetails();
  const { formatMessage } = useIntl();
  const refGroupButton = useRef<View>(null);
  const refScroll = useRef<KeyboardAwareScrollView>(null);
  const { date, time, doctor: doctorInfo } = route.params;
  const { doctor, auth, notification } = useAppStore();

  const [isShowPopup, setIsShowPopup] = useState(false);

  const onConfirmPress = useCallback(() => {
    const {
      data: { id: patient_id, area_code_id, name = '', phone = '' },
    } = auth;
    doctor
      .bookingAppointment({
        appointment_id: date.id!,
        patient_id,
        patient_name: name || phone,
        patient_mobile: phone,
        patient_email: 'test@gmail.com',
        is_new_patient: 0,
        doctor_id: doctorInfo.id,
        area_code_id,
      })
      .then(() => {
        setIsShowPopup(true);
      })
      .catch((msg) => {
        Alert.alert(
          formatMessage({ id: 'appointment.booking.alert' }),
          msg?.toString?.() ||
            formatMessage({ id: 'appointment.booking.error' }),
        );
      });
  }, [auth, date.id, doctor, doctorInfo.id, formatMessage]);

  const onReschedulePress = useCallback(() => navigation.goBack(), [
    navigation,
  ]);

  const onBookNewAppointmentPress = useCallback(() => {
    setIsShowPopup(false);
    navigation.replace(ROUTES.APPOINTMENT_LIST, {});
    const param: NotificationParam = {
      user_type: 'PATIENT',
      user_id: auth.data?.id,
      is_read: 0,
    };
    notification.getNotificationList(param);
  }, [auth.data?.id, navigation, notification]);

  const renderAddress = useMemo(() => {
    return (
      <View style={styles.keyValue}>
        <Icon65doctor name={ICONS.FLAG} style={styles.icon} />
        <Text style={styles.description}>{doctorInfo.address}</Text>
      </View>
    );
  }, [styles, doctorInfo]);

  const renderTime = useMemo(() => {
    return (
      <View style={styles.date}>
        <Icon65doctor name={ICONS.CLOCK} style={styles.iconDate} />
        <Text style={styles.description}>
          {getAppointmentTime(date.date, time.time)}
        </Text>
      </View>
    );
  }, [styles, date, time]);

  const handleFocus = useCallback(() => {
    refGroupButton.current?.measureInWindow((x, y) => {
      debounce?.(() => {
        refScroll.current?.scrollToPosition(x, y);
      }, 333)?.();
    });
  }, []);

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'appointment.details' })}
      />
      <KeyboardAwareScrollView
        ref={refScroll}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <FastImage
            source={{ uri: doctorInfo?.avatar }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{doctorInfo.name}</Text>
        <Text isViewHtml numberOfLines={1} style={styles.category}>
          {doctorInfo.category}
        </Text>
        <Rate
          percent={Number(doctorInfo?.rating_avg)}
          style={styles.rating}
          activeColor={'yellow'}
        />

        {renderAddress}
        {renderTime}

        <Text fontType={'MEDIUM_SF'} style={styles.comment}>
          {formatMessage({ id: 'appointment.comments' })}
        </Text>
        <TextField
          style={styles.input}
          multiline
          onFocus={handleFocus}
          fontType={'REGULAR_SF'}
          placeholder={formatMessage({
            id: 'appointment.comments_placeholder',
          })}
        />

        <View ref={refGroupButton} style={styles.buttonGroup}>
          <Button
            style={styles.button}
            buttonStyle={BUTTON_STYLES.BLUE}
            fontType={'MEDIUM_SF'}
            label={formatMessage({ id: 'appointment.confirm' })}
            onPress={onConfirmPress}
          />
          <Button
            style={styles.button}
            buttonStyle={BUTTON_STYLES.BLUE}
            fontType={'MEDIUM_SF'}
            label={formatMessage({ id: 'appointment.reschedule' })}
            onPress={onReschedulePress}
          />
        </View>
      </KeyboardAwareScrollView>
      <Modal isVisible={isShowPopup} useNativeDriver>
        <View style={styles.popupContainer}>
          <Icon65doctor name={ICONS.CHECK} style={styles.iconCheck} />
          <Text fontType={'REGULAR_SF'} style={styles.msg}>
            {formatMessage({ id: 'appointment.booked_success' })}
          </Text>
          <Button
            buttonStyle={BUTTON_STYLES.BLUE}
            fontType={'MEDIUM_SF'}
            label={formatMessage({ id: 'book_new_appointment' })}
            onPress={onBookNewAppointmentPress}
            style={{ width: '70%' }}
          />
        </View>
      </Modal>
    </View>
  );
};

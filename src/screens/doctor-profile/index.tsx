import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import {
  AppBars,
  Button,
  DateItem,
  Text,
  TimeItem,
  Touchable,
} from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { Rate } from '@/components/elements/rating';
import { useAppStore } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { showErrorToast } from '@/tools';
import { Date, DateProps } from '@/types/date';
import { Time } from '@/types/time';
import { openCall } from '@/utils';
import { alertMessage } from '@/utils/alert.helper';
import { DoctorProfileLoader } from './doctor-profile-loader';
import { useStyleDoctorProfile } from './styles';
import { DoctorProfilePropsScreen } from './types';

export const DoctorProfileScreen = observer(
  ({ navigation, route }: DoctorProfilePropsScreen) => {
    const styles = useStyleDoctorProfile();
    const { formatMessage } = useIntl();
    const { params } = route;
    const { doctor } = useAppStore();
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<Time>();
    const { doctorsInfoDetail } = doctor;

    const onProfileTabPress = useCallback(() => {
      setTabIndex(0);
    }, []);

    const onAppointmentTabPress = useCallback(() => {
      setTabIndex(1);
    }, []);

    const onPhonePress = useCallback(() => {
      openCall(doctorsInfoDetail?.phone);
    }, [doctorsInfoDetail?.phone]);

    const onBookAppointmentPress = useCallback(() => {
      if (isEmpty(selectedTime) || isEmpty(selectedTime)) {
        showErrorToast(formatMessage({ id: 'error.booking.empty' }));
      } else {
        NavigationService.navigate(ROUTES.APPOINTMENT_DETAILS, {
          date: selectedDate!,
          time: selectedTime!,
          doctor: doctor.doctorsInfoDetail!,
        });
      }
    }, [selectedTime, formatMessage, selectedDate, doctor.doctorsInfoDetail]);

    const renderAddress = useMemo(() => {
      return (
        <View style={styles.keyValue}>
          <View style={[styles.iconContainer, { alignSelf: 'flex-start' }]}>
            <Icon65doctor name={ICONS.FLAG} style={styles.icon} />
          </View>
          <View style={styles.description}>
            <Text numberOfLines={1} isViewHtml>
              {doctorsInfoDetail?.address}
            </Text>
          </View>
        </View>
      );
    }, [styles, doctorsInfoDetail]);

    const renderPhone = useMemo(() => {
      return (
        <Touchable style={styles.keyValue} onPress={onPhonePress}>
          <View style={styles.iconContainer}>
            <Icon65doctor name={ICONS.PHONE} style={styles.icon} />
          </View>
          <Text style={styles.phone}>{doctorsInfoDetail?.phone}</Text>
        </Touchable>
      );
    }, [styles, onPhonePress, doctorsInfoDetail]);

    const renderOpening = useMemo(() => {
      return (
        <View style={styles.openingContainer}>
          <View style={styles.iconContainer}>
            <Icon65doctor name={ICONS.CLOCK} style={styles.icon} />
          </View>
          <View style={styles.openingDetails}>
            <View style={styles.openingOver}>
              <Text style={styles.opening}>
                {formatMessage({ id: 'profile.opening' })}
              </Text>
              <Text
                style={
                  styles.description
                }>{` · ${doctorsInfoDetail?.opening}`}</Text>
            </View>

            {doctorsInfoDetail?.openingDays?.map?.((item, index) => {
              return (
                <View style={styles.keyValue} key={index?.toString()}>
                  <Text style={styles.day}>{item.day}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    }, [styles, doctorsInfoDetail, formatMessage]);

    const renderDoctorProfile = useMemo(() => {
      return (
        <>
          <Text isLongText isViewHtml style={styles.details} numberOfLines={4}>
            {`• ${doctorsInfoDetail?.details ? doctorsInfoDetail?.details : ''}
              • ${
                doctorsInfoDetail?.accreditedHospital
                  ? doctorsInfoDetail?.accreditedHospital
                  : ''
              }
              • ${doctorsInfoDetail?.awards ? doctorsInfoDetail?.awards : ''}
              • ${
                doctorsInfoDetail?.consultationFee
                  ? doctorsInfoDetail?.consultationFee
                  : ''
              }
              • ${
                doctorsInfoDetail?.education ? doctorsInfoDetail?.education : ''
              }
              • ${
                doctorsInfoDetail?.languagesSpoken
                  ? doctorsInfoDetail?.languagesSpoken
                  : ''
              }
              • ${
                doctorsInfoDetail?.qualifications
                  ? doctorsInfoDetail?.qualifications
                  : ''
              }
              • ${
                doctorsInfoDetail?.workingPositions
                  ? doctorsInfoDetail?.workingPositions
                  : ''
              }
            `}
          </Text>
          <Text style={styles.section}>
            {formatMessage(
              { id: 'profile.exp' },
              { exp: doctorsInfoDetail?.exp },
            )}
          </Text>

          {renderAddress}
          {renderPhone}
          {renderOpening}
        </>
      );
    }, [
      styles.details,
      styles.section,
      doctorsInfoDetail,
      formatMessage,
      renderAddress,
      renderOpening,
      renderPhone,
    ]);

    const keyExtractor = useCallback(
      (item: any, index: number) => index.toString(),
      [],
    );

    const onDayPress = useCallback((item: Date) => {
      setSelectedDate(item);
      setSelectedTime(undefined);
    }, []);

    const onTimePress = useCallback((item: Time) => {
      setSelectedTime(item);
    }, []);

    const renderDayItem = useCallback(
      ({ item }: DateProps) => {
        return (
          <DateItem
            onPress={onDayPress}
            item={item}
            isSelected={selectedDate?.dayOfMonth === item?.dayOfMonth}
          />
        );
      },
      [onDayPress, selectedDate?.dayOfMonth],
    );

    const renderBookAppointment = useMemo(() => {
      return (
        <>
          <Text style={styles.section}>
            {formatMessage({ id: 'profile.available_days' })}
          </Text>
          <FlatList
            keyExtractor={keyExtractor}
            horizontal
            data={doctorsInfoDetail?.nextAvailableDays || []}
            renderItem={renderDayItem}
          />
          <Text style={styles.section}>
            {formatMessage({ id: 'profile.available_hours' })}
          </Text>

          <View style={styles.timeList}>
            {doctorsInfoDetail?.availableHours?.map?.((item, index) => {
              if (item.str !== selectedDate?.str) {
                return <Fragment key={index.toString()} />;
              }
              return (
                <TimeItem
                  onPress={onTimePress}
                  item={item}
                  isSelected={selectedTime?.id === item?.id}
                  key={keyExtractor(item, index)}
                />
              );
            })}
          </View>

          <Button
            disabled={!selectedTime}
            style={styles.bookAppointmentButton}
            buttonStyle={BUTTON_STYLES.BLUE}
            label={formatMessage({ id: 'book_appointment' })}
            onPress={onBookAppointmentPress}
          />
        </>
      );
    }, [
      doctorsInfoDetail?.availableHours,
      doctorsInfoDetail?.nextAvailableDays,
      formatMessage,
      keyExtractor,
      onBookAppointmentPress,
      onTimePress,
      renderDayItem,
      selectedDate?.str,
      selectedTime,
      styles.bookAppointmentButton,
      styles.section,
      styles.timeList,
    ]);

    const getDoctorDetail = useCallback(async () => {
      try {
        await doctor.getDoctorDetail(params.id);
      } catch (error) {
        alertMessage(error, () => {
          NavigationService.back();
        });
      }
    }, [doctor, params.id]);

    useEffect(() => {
      getDoctorDetail();
    }, [doctor, getDoctorDetail, params.id]);

    if (
      !doctorsInfoDetail ||
      ((doctor.isLoading || !doctorsInfoDetail) && !doctor.isLoadingCall)
    ) {
      return <DoctorProfileLoader />;
    }

    return (
      <View style={styles.container}>
        <AppBars isShadowBottom={false} title={doctorsInfoDetail?.name} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.avatarContainer}>
            <FastImage
              source={{ uri: doctorsInfoDetail?.avatar }}
              resizeMode="cover"
              style={styles.avatar}
            />
          </View>
          <Text numberOfLines={1} style={styles.name}>
            {doctorsInfoDetail?.name}
          </Text>
          <Text
            numberOfLines={1}
            isViewHtml
            showMore={false}
            style={styles.category}>
            {doctorsInfoDetail?.category}
          </Text>
          <Rate
            percent={doctorsInfoDetail?.rating_avg || 0}
            style={styles.rating}
            activeColor="yellow"
          />

          <View style={styles.buttonGroup}>
            <Button
              style={styles.button}
              buttonStyle={
                tabIndex === 0 ? BUTTON_STYLES.BLUE : BUTTON_STYLES.GRAY
              }
              label={formatMessage({ id: 'profile' })}
              onPress={onProfileTabPress}
            />
            <Button
              style={styles.button}
              buttonStyle={
                tabIndex === 1 ? BUTTON_STYLES.BLUE : BUTTON_STYLES.GRAY
              }
              label={formatMessage({ id: 'appointment' })}
              onPress={onAppointmentTabPress}
            />
          </View>
          {tabIndex === 0 ? renderDoctorProfile : renderBookAppointment}
        </ScrollView>
      </View>
    );
  },
);

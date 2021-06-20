import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { AppBars, NotificationItem } from '@/components';
import { useAppStore, useConfirmation } from '@/hooks';
import {
  NotificationParam,
  NotificationResponse,
  StatusDoctor,
} from '@/models/types';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { NotificationProps } from '@/types/notification';
import { alertMessage } from '@/utils/alert.helper';
import { useNotificationStyle } from './styles';

export const NotificationScreen = observer(({ navigation }) => {
  const styles = useNotificationStyle();
  const { formatMessage } = useIntl();
  const {
    notification,
    auth,
    appState,
    doctor,
    payment,
    clinic,
  } = useAppStore();
  const { listNotification } = notification;
  const confirmation = useConfirmation();

  useEffect(() => {
    const param: NotificationParam = {
      user_type: 'PATIENT',
      user_id: auth.data?.id,
      set_read: 1,
    };
    notification.getNotificationList(param);
  }, [auth.data?.id, notification]);

  useEffect(() => {
    console.log('====================================');
    console.log('notiList', toJS(listNotification));
    console.log('====================================');
  }, [listNotification]);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, [styles.separator]);

  const onConfirm = useCallback(
    async (goto: ROUTES, callback?: () => Promise<void>) => {
      try {
        appState.isShowLoading = true;
        if (Number(payment.wallet?.balance!) <= 0) {
          confirmation.showInfo({
            supportText: formatMessage(
              { id: 'app.wallet.warning' },
              { cost: 5 },
            ),
            buttons: [
              {
                onPress: () => {
                  NavigationService.navigate(ROUTES.WALLET, {});
                },
                text: formatMessage({ id: 'app.top_up_amount' }),
              },
            ],
          });
        } else {
          await callback?.();
          NavigationService.navigate(goto, {});
        }
      } catch (error) {
        alertMessage(error.data.message);
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, confirmation, formatMessage, payment.wallet?.balance],
  );

  console.log('====================================');
  console.log('clinicDoctorsInfo', clinic.clinicDoctorsInfo);
  console.log('====================================');

  const handleAction = useCallback(
    (
      item: NotificationResponse,
      screen: ROUTES,
      doctor_id,
      callback?: (item: NotificationResponse) => Promise<void>,
    ) => {
      console.log('====================================');
      console.log('doctor_id', doctor_id);
      console.log('====================================');
      if (!doctor_id) {
        alertMessage(formatMessage({ id: 'clinic.doctor.not_in_65doctor' }));
        return;
      }
      onConfirm(screen, async () => {
        await callback?.(item);
        clinic.setChosenDoctorId(doctor_id);
        navigation.navigate(screen, item);
      });
    },
    [clinic, formatMessage, navigation, onConfirm],
  );

  const onActionPress = useCallback(
    async (item: NotificationResponse) => {
      try {
        appState.isShowLoading = true;
        const idDoctor = item?.data?.is_from_patient
          ? item?.data?.receiver_id
          : item?.data?.sender_id;
        console.log('====================================');
        console.log('idDoctor', idDoctor);
        console.log('====================================');
        const doctorStatus: StatusDoctor = await doctor.getUserDoctor(idDoctor);
        if (!doctorStatus.isOnline) {
          alertMessage(formatMessage({ id: 'clinic.doctor.offline' }));
          return;
        }
        confirmation.show({
          supportText: formatMessage(
            { id: 'permissions.doctor.call' },
            { cost: 5 },
          ),
          buttons: [
            {
              onPress: () =>
                handleAction(item, ROUTES.PRE_CONSULTATION, idDoctor),
              text: formatMessage({
                id: 'app.agree',
              }),
            },
            {
              onPress: () => {},
              text: formatMessage({
                id: 'app.back',
              }),
            },
          ],
        });
      } catch (error) {
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, confirmation, doctor, formatMessage, handleAction],
  );

  const renderNotificationItem = useCallback(
    ({ item }: NotificationProps) => {
      return <NotificationItem item={item} {...{ onActionPress }} />;
    },
    [onActionPress],
  );

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  return (
    <View style={styles.container}>
      <AppBars
        textAlign="left"
        title={formatMessage({ id: 'notifications' })}
        isShadowBottom={false}
        hasRightIcons={false}
      />
      {!appState.isShowLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.patientList}
          data={toJS(listNotification).data}
          renderItem={renderNotificationItem}
          ListFooterComponent={ItemSeparatorComponent}
          {...{ keyExtractor, ItemSeparatorComponent }}
        />
      )}
    </View>
  );
});

import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Alert, FlatList, Image, View } from 'react-native';
import { observer } from 'mobx-react';
import { Calendar, Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, Text, Touchable } from '@/components';
import { useAppStore } from '@/hooks';
import { ROUTES } from '@/stack';
import { useStyleMyProfile } from './styles';
import { Menu, MenuProps } from './types';

export const MyProfileScreen = observer(({ navigation }) => {
  const styles = useStyleMyProfile();
  const { formatMessage } = useIntl();
  const { auth, payment, condition } = useAppStore();
  const { creditCard } = payment;
  const { medicalHistoryDetail } = condition;

  const hasMedicalDetail = useMemo(() => {
    return (
      medicalHistoryDetail?.height > 0 &&
      medicalHistoryDetail?.weight > 0 &&
      medicalHistoryDetail?.symptoms?.length > 0
    );
  }, [
    medicalHistoryDetail?.height,
    medicalHistoryDetail?.symptoms?.length,
    medicalHistoryDetail?.weight,
  ]);
  const hasCard = useMemo(() => {
    console.log('====================================');
    console.log('creditCard', creditCard);
    console.log('====================================');
    return creditCard ? creditCard?.length > 0 : false;
  }, [creditCard]);

  const menus = useMemo(
    () => [
      {
        id: 1,
        label: formatMessage({ id: 'personal_details' }),
        icon: ICONS.PROFILE,
        screen: ROUTES.PERSONAL_PROFILE,
      },
      {
        id: 2,
        label: formatMessage({ id: 'medical_history' }),
        style: hasMedicalDetail ? styles.blackText : styles.redText,
        icon: ICONS.MEDICAL,
        screen: ROUTES.MEDICAL_HISTORY,
      },
      {
        id: 3,
        label: formatMessage({ id: 'payment' }),
        style: hasCard ? styles.blackText : styles.redText,
        icon: ICONS.PAYMENT,
        screen: ROUTES.PAYMENT,
      },
      {
        id: 4,
        label: formatMessage({ id: 'active_member_code' }),
        style: styles.blueText,
        icon: ICONS.ACTIVE,
        screen: ROUTES.ACTIVE_MEMBER_CODE,
      },
      {
        id: 5,
        label: formatMessage({ id: 'legal' }),
        icon: ICONS.LEGAL,
        screen: ROUTES.LEGAL,
      },
      {
        id: 6,
        label: formatMessage({ id: 'invoices' }),
        icon: ICONS.INVOICE,
        screen: ROUTES.INVOICES,
      },
      {
        id: 7,
        label: formatMessage({ id: 'appointment' }),
        icon: Calendar,
        screen: ROUTES.APPOINTMENT_LIST,
        type: 'png',
      },
      {
        id: 8,
        label: formatMessage({ id: 'log_out' }),
        icon: ICONS.LOGOUT,
        screen: ROUTES.LOGIN,
      },
    ],
    [
      formatMessage,
      hasCard,
      hasMedicalDetail,
      styles.blackText,
      styles.blueText,
      styles.redText,
    ],
  );

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const onMenuPress = useCallback(
    (item?: Menu) => {
      if (item?.id === 8) {
        setTimeout(() => {
          Alert.alert(formatMessage({ id: 'app.logout' }), '', [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'OK',
              onPress: () => {
                auth.logout();
              },
            },
          ]);
        }, 0);
      } else {
        switch (item?.id) {
          default:
            navigation.navigate(item?.screen, item?.id === 3 ? hasCard : item);
            break;
        }
      }
    },
    [auth, formatMessage, hasCard, navigation],
  );

  function renderMenuItem({ item }: MenuProps) {
    function onPress() {
      return onMenuPress?.(item);
    }

    return (
      <Touchable style={styles.keyValue} onPress={onPress}>
        {item?.type === 'png' ? (
          <View style={styles.imageContainer}>
            <Image source={item.icon} style={styles.image} />
          </View>
        ) : (
          <Icon65doctor name={item?.icon} style={styles.icon} />
        )}
        <Text fontType={'MEDIUM_SF'} style={[styles.text, item?.style]}>
          {item?.label}
        </Text>
      </Touchable>
    );
  }

  return (
    <View style={styles.container}>
      <AppBars isShadowBottom={false} hasBack />

      <Text fontType={'BOLD_SF'} style={styles.title}>
        {formatMessage({ id: 'my_profile' })}
      </Text>

      <FlatList
        style={styles.list}
        keyExtractor={keyExtractor}
        data={menus}
        renderItem={renderMenuItem}
      />
    </View>
  );
});

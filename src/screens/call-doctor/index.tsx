import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, Text, Touchable } from '@/components';
import { Rate } from '@/components/elements/rating';
import Slider from '@/components/elements/slider';
import { useAppStore } from '@/hooks';
import { useConfirmation } from '@/hooks/use-confirmation';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { Platform } from '@/theme';
import { getDisplayedAvatar } from '@/utils';
import { alertMessage } from '@/utils/alert.helper';
import { useStyleCallDoctor } from './styles';

export const CallDoctorScreen = observer(({}) => {
  const styles = useStyleCallDoctor();
  const { formatMessage } = useIntl();
  const { payment, clinic, chat, appState } = useAppStore();
  const doctor = useMemo(() => clinic.choicedDoctor, [clinic.choicedDoctor]);
  const confirmation = useConfirmation();

  const renderDoctorProfile = useMemo(() => {
    return (
      <View style={styles.profileContainer}>
        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'biography' })}
        </Text>
        <Text style={styles.details}>{doctor?.name?.trim()}</Text>
        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'experience' })}
        </Text>
        <Text style={styles.description}>{doctor?.year_experience}</Text>
        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'language_known' })}
        </Text>
        <Text style={styles.description}>{doctor?.specialty}</Text>
      </View>
    );
  }, [
    styles.profileContainer,
    styles.section,
    styles.details,
    styles.description,
    formatMessage,
    doctor?.name,
    doctor?.year_experience,
    doctor?.specialty,
  ]);

  const startChat = useCallback(async () => {
    await chat.startChat(doctor?._65doctor_id);
  }, [chat, doctor._65doctor_id]);

  const onConfirm = useCallback(
    async (route: ROUTES, callback?: () => Promise<void>) => {
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
          NavigationService.navigate(route, doctor);
        }
      } catch (error) {
        alertMessage(error.data.message);
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, confirmation, doctor, formatMessage, payment.wallet?.balance],
  );

  const onChat = useCallback(() => {
    confirmation.show({
      supportText: formatMessage(
        { id: 'permissions.doctor.chat' },
        { cost: 5 },
      ),
      buttons: [
        {
          onPress: () => onConfirm(ROUTES.CHATTING, startChat),
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
  }, [confirmation, formatMessage, onConfirm, startChat]);

  const onCallDoctor = useCallback(() => {
    confirmation.show({
      supportText: formatMessage(
        { id: 'permissions.doctor.call' },
        { cost: 5 },
      ),
      buttons: [
        {
          onPress: () => onConfirm(ROUTES.PRE_CONSULTATION),
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
  }, [confirmation, formatMessage, onConfirm]);

  const renderAction = useMemo(() => {
    return (
      <View style={styles.action}>
        <Slider
          isLeftToRight={true} // set false to move slider Right to Left
          onEndReached={onCallDoctor}
          isOpacityChangeOnSlide={true}
          containerStyle={styles.actionLeft}
          thumbElement={
            <View style={styles.iconCallContainer}>
              <Icon65doctor name={ICONS.VIDEO_CALL} style={styles.iconCall} />
            </View>
          }>
          <View style={styles.actionDetails}>
            <Text fontType={'BOLD_SF'}>
              {formatMessage({ id: 'video_call_cost' }, { cost: 5 })}
            </Text>
            <Text style={styles.details}>
              {formatMessage({ id: 'slide_to_call' })}
            </Text>
          </View>
        </Slider>

        <Touchable onPress={onChat} style={styles.iconCostContainer}>
          <Icon65doctor name={ICONS.MESSAGE} style={styles.iconCost} />
          <View style={styles.costLabelContainer}>
            <Text fontType={'BOLD_SF'} style={styles.costLabel}>
              {formatMessage({ id: 'cost' }, { cost: 5 })}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }, [
    styles.action,
    styles.actionLeft,
    styles.iconCallContainer,
    styles.iconCall,
    styles.actionDetails,
    styles.details,
    styles.iconCostContainer,
    styles.iconCost,
    styles.costLabelContainer,
    styles.costLabel,
    onCallDoctor,
    formatMessage,
    onChat,
  ]);

  const doctorAvatar = useMemo(() => {
    return getDisplayedAvatar(doctor?.photo);
  }, [doctor?.photo]);

  return (
    <View style={styles.container}>
      <AppBars isShadowBottom={false} title={doctor?.name} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <FastImage
            source={doctorAvatar}
            resizeMode="cover"
            style={styles.avatar}
          />
        </View>
        <Text fontType={'BOLD_SF'} style={styles.name}>
          {doctor?.name}
        </Text>
        <Text isViewHtml style={styles.category}>
          {doctor?.specialty}
        </Text>
        <Rate
          percent={doctor?.rating_avg || 0}
          style={styles.rating}
          activeColor={'yellow'}
        />

        {renderAction}
        {renderDoctorProfile}
      </ScrollView>
    </View>
  );
});

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, DoctorClinicItem, Text, TextField } from '@/components';
import TopReviewDoctor from '@/components/items/item-doctor-clinic/TopReviewDoctor';
import { DoctorClinicProps } from '@/components/items/item-doctor-clinic/type';
import { useAppStore, useCometChat, useConfirmation } from '@/hooks';
import { DoctorClinic, StatusDoctor } from '@/models/types';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { useTheme } from '@/theme';
import { alertMessage } from '@/utils/alert.helper';
import { useStyleClinicDoctorsScreen } from './styles';

export const ClinicDoctorsScreen = observer(({ navigation, route }) => {
  const styles = useStyleClinicDoctorsScreen();
  const { formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');
  const { payment, clinic, chat, auth, appState, doctor } = useAppStore();
  const confirmation = useConfirmation();
  const cometChat = useCometChat();
  const [recommendedDoctors, setRecommendedDoctors] = useState<DoctorClinic[]>(
    [],
  );
  const { colors } = useTheme();

  useEffect(() => {
    setRecommendedDoctors(clinic.clinicDoctorsInfo);
  }, [clinic.clinicDoctorsInfo]);

  useEffect(() => {
    cometChat.createUser(
      {
        name: auth.data.name || 'noname',
        uid: auth.data.id.toString(),
        avatar: auth.data.image,
      },
      '1',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = route?.params?.id;
    clinic.getClinic(id);
    clinic.getDoctorTopReview(id);

    return () => {
      clinic.clinicDoctorsInfo = [];
    };
  }, [clinic, route?.params?.id]);

  const onChangeTextSearch = _.debounce(
    (text) => {
      setSearchText(text);
      if (!text) {
        setRecommendedDoctors(clinic.clinicDoctorsInfo);
      }
    },
    400,
    { leading: false, trailing: true },
  );

  useEffect(() => {
    if (searchText) {
      const search = clinic.clinicDoctorsInfo.filter((value) => {
        return value?.name ? value?.name.includes(searchText) : false;
      });
      setRecommendedDoctors(search);
    }
  }, [clinic.clinicDoctorsInfo, searchText]);

  const keyExtractor = useCallback(
    (item: any, index: number) => index?.toString(),
    [],
  );

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

  const startChat = useCallback(
    async (item: DoctorClinic) => {
      await chat.startChat(item?._65doctor_id);
    },
    [chat],
  );

  const handleAction = useCallback(
    (
      item: DoctorClinic,
      screen: ROUTES,
      callback?: (item: DoctorClinic) => Promise<void>,
    ) => {
      if (!item._65doctor_id) {
        alertMessage(formatMessage({ id: 'clinic.doctor.not_in_65doctor' }));
        return;
      }
      onConfirm(screen, async () => {
        await callback?.(item);
        clinic.setChoicedDoctor(item);
        navigation.navigate(screen, item);
      });
    },
    [clinic, formatMessage, navigation, onConfirm],
  );

  const onItemPress = useCallback(
    async (item: DoctorClinic) => {
      try {
        appState.isShowLoading = true;
        if (!item._65doctor_id) {
          alertMessage(formatMessage({ id: 'clinic.doctor.offline' }));
          return;
        }
        const doctorStatus: StatusDoctor = await doctor.getUserDoctor(
          item._65doctor_id,
        );
        if (!doctorStatus.isOnline) {
          alertMessage(formatMessage({ id: 'clinic.doctor.offline' }));
          return;
        }
        handleAction(item, ROUTES.CALL_DOCTOR);
      } catch (error) {
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, doctor, formatMessage, handleAction],
  );

  const onChatPress = useCallback(
    async (item: DoctorClinic) => {
      try {
        appState.isShowLoading = true;
        const doctorStatus: StatusDoctor = await doctor.getUserDoctor(
          item._65doctor_id,
        );
        if (!doctorStatus.isOnline) {
          alertMessage(formatMessage({ id: 'clinic.doctor.offline' }));
          return;
        }

        confirmation.show({
          supportText: formatMessage(
            { id: 'permissions.doctor.chat' },
            { cost: 5 },
          ),
          buttons: [
            {
              onPress: () => handleAction(item, ROUTES.CHATTING, startChat),
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
    [appState, confirmation, doctor, formatMessage, handleAction, startChat],
  );

  const onVideoCallPress = useCallback(
    async (item: DoctorClinic) => {
      try {
        appState.isShowLoading = true;
        const doctorStatus: StatusDoctor = await doctor.getUserDoctor(
          item._65doctor_id,
        );
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
              onPress: () => handleAction(item, ROUTES.PRE_CONSULTATION),
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

  const renderRecommendedDoctorItem = useCallback(
    ({ item }: DoctorClinicProps) => {
      return (
        <DoctorClinicItem
          item={item}
          {...{ onItemPress, onChatPress, onVideoCallPress }}
        />
      );
    },
    [onChatPress, onItemPress, onVideoCallPress],
  );

  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        <View style={styles.searchContainer}>
          <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />

          <TextField
            fontType={'REGULAR_SF'}
            style={styles.input}
            placeholder={formatMessage({ id: 'search.clinic' })}
            placeholderTextColor={colors.darkGray}
            onChangeText={onChangeTextSearch}
          />
        </View>

        {/* {renderFilters} */}

        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'top_review_doctor' })}
        </Text>

        <TopReviewDoctor {...{ onItemPress }} />

        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'your_recommended' })}
        </Text>
      </>
    );
  }, [
    styles.searchContainer,
    styles.searchIcon,
    styles.input,
    styles.section,
    formatMessage,
    colors.darkGray,
    onChangeTextSearch,
    onItemPress,
  ]);

  const ListFooterComponent = useCallback(() => {
    return <View style={styles.footer} />;
  }, [styles.footer]);

  return (
    <View style={styles.container}>
      <AppBars
        textAlign="left"
        title={formatMessage({ id: 'clinic.doctors' })}
        isShadowBottom={false}
      />

      <FlatList
        style={styles.list}
        data={recommendedDoctors}
        renderItem={renderRecommendedDoctorItem}
        {...{ keyExtractor, ListHeaderComponent, ListFooterComponent }}
      />
    </View>
  );
});

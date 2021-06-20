import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Alert, FlatList, View } from 'react-native';
import _ from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, Button, Text, TextField, Touchable } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAgora, useAppStore, usePermissions } from '@/hooks';
import { TYPE_CALL } from '@/tools/agora/types';
import { alertMessage } from '@/utils/alert.helper';
import { Sympton, SymptonDetail } from '../pre-consultation/type';
import { useStyleSymptom } from './styles';
import { SymptonDetailProps } from './type';

export const SymptomScreen = observer(() => {
  const styles = useStyleSymptom();
  const { formatMessage } = useIntl();
  const { doctor, appState, condition, clinic } = useAppStore();
  const [filters, setFilters] = useState<SymptonDetail[]>([]);
  const [symptonDetails, setSymptonDetails] = useState<SymptonDetail[]>([]);
  const [searchText, setSearchText] = useState('');
  const permissions = usePermissions();
  const agra = useAgora();
  const choicedDoctor = useMemo(() => clinic.choicedDoctor, [
    clinic.choicedDoctor,
  ]);
  const getSymptonDetails = useCallback(async () => {
    await Promise.all([
      ...condition.choicedSymtons.map((value: Sympton) =>
        condition.getSymptonDetails(value.id),
      ),
    ]);
  }, [condition]);

  useEffect(() => {
    getSymptonDetails();
  }, [condition, getSymptonDetails]);

  useEffect(() => {
    setSymptonDetails(condition.symptonDetails);
  }, [condition.symptonDetails]);

  useEffect(() => {
    condition.setChoicedSymtonDetails(filters);
  }, [condition, filters]);

  const onChangeTextSearch = _.debounce(
    (text) => {
      setSearchText(text);
      if (!text) {
        setSymptonDetails(condition.symptonDetails);
      }
    },
    400,
    { leading: false, trailing: true },
  );

  useEffect(() => {
    if (searchText) {
      const search = condition.symptonDetails.filter((value) => {
        return value.name.includes(searchText);
      });
      setSymptonDetails(search);
    }
  }, [condition.symptonDetails, searchText]);

  const keyExtractor = useCallback(() => Math.random().toString(), []);

  const onDeleteFilter = useCallback(
    (item: SymptonDetail) => {
      setFilters(filters.filter((filter) => filter.id !== item.id));
    },
    [filters],
  );

  const submitConsultation = useCallback(async () => {
    try {
      if (!condition.choicedSymtonDetails.length) {
        // check nếu chưa chọn chi tiết triệu chứng
        alertMessage(
          formatMessage({ id: 'pre.consultation.nosympton_detail' }),
          () => {},
        );
        throw formatMessage({ id: 'pre.consultation.nosympton_detail' });
      }
      await condition.submitConsultation();
    } catch (error) {
      throw error;
    }
  }, [condition, formatMessage]);

  const onCallDoctorPress = useCallback(async () => {
    try {
      appState.isShowLoading = true;
      console.log('choicedDoctor', choicedDoctor);
      const doctor_id = clinic.chosenDoctorId || choicedDoctor._65doctor_id;

      await submitConsultation(); // call api tư vấn
      permissions.requestVideoCallPermission(() => {
        doctor
          .callDoctor(+doctor_id)
          .then(({ channelName, token, uid, paymentOption }) => {
            console.log(
              `🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------`,
            );
            console.log(
              `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 106 ~ .then ~ paymentOption`,
              paymentOption,
            );
            console.log(
              `🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------`,
            );
            agra.startCall({
              infoJoin: {
                channelName,
                token,
                optionalUid: +uid,
                optionalInfo: paymentOption?.doctorId,
              },
              type: TYPE_CALL.VIDEO,
            });
          })
          .catch((msg) => {
            Alert.alert(
              formatMessage({ id: 'appointment.booking.alert' }),
              msg?.toString?.() ||
                formatMessage({ id: 'appointment.booking.error' }),
            );
          })
          .finally(() => {
            appState.isShowLoading = false;
          });
      });
    } catch (error) {
    } finally {
      appState.isShowLoading = false;
    }
  }, [
    agra,
    appState,
    choicedDoctor,
    clinic.chosenDoctorId,
    doctor,
    formatMessage,
    permissions,
    submitConsultation,
  ]);

  const onChoiceSympton = useCallback(
    (item: SymptonDetail) => {
      const arr = _.uniqBy([...filters, item], (e) => {
        return e.id;
      });
      setFilters(arr);
    },
    [filters],
  );

  const renderFilterItem = useCallback(
    ({ item }: SymptonDetailProps) => {
      function onPress() {
        onDeleteFilter(item);
      }

      return (
        <Touchable onPress={onPress} style={styles.filter}>
          <Text numberOfLines={1}>{item.name}</Text>
          <Icon65doctor
            name={ICONS.CLOSE}
            style={styles.deleteIcon}
            onPress={onPress}
          />
        </Touchable>
      );
    },
    [styles.filter, styles.deleteIcon, onDeleteFilter],
  );

  const renderSymptomItem = useCallback(
    ({ item }: SymptonDetailProps) => {
      function onPress() {
        onChoiceSympton(item);
      }
      return (
        <Touchable onPress={onPress} style={styles.filter}>
          <Text numberOfLines={1}>{item?.name}</Text>
          <Icon65doctor name={ICONS.PLUS_BOLD} style={styles.plusIcon} />
        </Touchable>
      );
    },
    [onChoiceSympton, styles.filter, styles.plusIcon],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View style={styles.bottomContainer}>
        <View style={styles.separator} />
        <FlatList
          style={styles.doctorList}
          data={symptonDetails}
          renderItem={renderSymptomItem}
          numColumns={2}
          {...{ keyExtractor }}
        />
        <Button
          style={styles.button}
          buttonStyle={BUTTON_STYLES.BLUE}
          label={formatMessage({ id: 'call_doctor' })}
          onPress={onCallDoctorPress}
        />
      </View>
    ),
    [
      styles.bottomContainer,
      styles.separator,
      styles.doctorList,
      styles.button,
      renderSymptomItem,
      keyExtractor,
      formatMessage,
      onCallDoctorPress,
      symptonDetails,
    ],
  );

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'your_symptoms' })}
      />

      <View style={styles.contentContainer}>
        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'select_symptoms' })}
        </Text>

        <View style={styles.searchContainer}>
          <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />

          <TextField
            fontType={'REGULAR_SF'}
            style={styles.input}
            placeholder={formatMessage({ id: 'medical.search_hint' })}
            onChangeText={onChangeTextSearch}
          />
        </View>

        <FlatList
          data={toJS(filters)}
          renderItem={renderFilterItem}
          numColumns={2}
          {...{ keyExtractor, ListFooterComponent }}
        />
      </View>
    </View>
  );
});

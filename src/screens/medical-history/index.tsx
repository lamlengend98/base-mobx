import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import {
  FlatList,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, Button, Text, Touchable } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore, useSymptomPicker } from '@/hooks';
import { COLORS, Platform } from '@/theme';
import { StackNavigation } from '@/types/navigation';
import { alertMessage } from '@/utils/alert.helper';
import { MedicalHistoryParam } from '../pre-consultation/type';
import { useStyleMedicalHistory } from './styles';

interface ScreenProps {
  navigation: StackNavigation;
}

export const MedicalHistoryScreen = observer(({ navigation }: ScreenProps) => {
  const styles = useStyleMedicalHistory();
  const { formatMessage } = useIntl();
  const symptomPicker = useSymptomPicker();
  const refWeight: any = useRef(null);
  const refHeight: any = useRef(null);

  const { condition } = useAppStore();
  const {
    medicalHistoryDetail,
    chosenHeight,
    chosenWeight,
    symptons,
    choicedSymtons,
  } = condition;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    condition.getMedicalHistory();
    condition.getSymptons();
  }, [condition]);

  useEffect(() => {
    setHeight(chosenHeight?.toString() || '0');
    setWeight(chosenWeight?.toString() || '0');
  }, [chosenHeight, chosenWeight]);

  useEffect(() => {
    condition.setHeight(medicalHistoryDetail?.height);
    condition.setWeight(medicalHistoryDetail?.weight);
  }, [condition, medicalHistoryDetail?.height, medicalHistoryDetail?.weight]);

  const keyExtractor = useCallback(() => Math.random().toString(), []);

  const onDeleteFilter = useCallback(
    (item: any) => {
      const data = [...choicedSymtons];
      data.filter((symptom) => symptom.id !== +item.id);
      _.remove(data, (n) => n.id === item.id);
      condition.setChoicedSymton(data);
    },
    [choicedSymtons, condition],
  );

  const onSavePress = useCallback(async () => {
    const symptomIdArr: Array<number> = [];
    choicedSymtons.map((item) => {
      symptomIdArr.push(item.id);
    });
    const data: MedicalHistoryParam = {
      height: +height || 0,
      weight: +weight || 0,
      symptomIds: symptomIdArr,
    };
    const res = await condition.saveMedicalHistory(data);
    if (res) {
      alertMessage(formatMessage({ id: 'app.success' }), () => {
        navigation.goBack();
      });
    } else {
      alertMessage(formatMessage({ id: 'app.fail' }), () => {
        navigation.goBack();
      });
    }
  }, [choicedSymtons, condition, formatMessage, height, navigation, weight]);

  const renderFilter = useCallback(
    ({ item }) => {
      function onPress() {
        onDeleteFilter(item);
      }

      return (
        <View style={styles.filter}>
          <Text numberOfLines={1}>{item.name}</Text>
          <Icon65doctor
            name={ICONS.CLOSE}
            style={styles.deleteIcon}
            onPress={onPress}
          />
        </View>
      );
    },
    [styles.filter, styles.deleteIcon, onDeleteFilter],
  );

  const renderHeightSelector = useMemo(() => {
    function onChangeTextHeight(
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) {
      setHeight(e.nativeEvent.text || '0');
    }
    function onClear() {
      refHeight.current?.clear();
    }

    return (
      <View style={styles.filter}>
        <Text numberOfLines={1}>{formatMessage({ id: 'medical.height' })}</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '70%',
            justifyContent: 'flex-end',
          }}>
          <View style={{ width: '40%' }}>
            <TextInput
              allowFontScaling={false}
              onBlur={onChangeTextHeight}
              keyboardType={'number-pad'}
              defaultValue={height}
              placeholderTextColor={COLORS.DARK_GRAY}
              style={{
                textAlign: 'right',
                borderBottomWidth: 0.5,
                borderBottomColor: COLORS.DARK_GRAY,
                paddingBottom: Platform.SizeScale(1),
                paddingTop: 0,
                height: Platform.SizeScale(18),
              }}
              onFocus={onClear}
              ref={refHeight}
            />
          </View>
          <Text style={styles.medicalInfoValue} numberOfLines={1}>
            cm
          </Text>
        </View>
      </View>
    );
  }, [styles.filter, styles.medicalInfoValue, formatMessage, height]);

  const renderWeightSelector = useMemo(() => {
    function onChangeTextWeight(
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) {
      setWeight(e.nativeEvent.text || '0');
    }
    function onClear() {
      refWeight.current?.clear();
    }
    return (
      <View style={styles.filter}>
        <Text numberOfLines={1}>{formatMessage({ id: 'medical.weight' })}</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '70%',
            justifyContent: 'flex-end',
          }}>
          <View style={{ width: '40%' }}>
            <TextInput
              allowFontScaling={false}
              keyboardType={'numeric'}
              onBlur={onChangeTextWeight}
              defaultValue={weight}
              placeholderTextColor={COLORS.DARK_GRAY}
              style={{
                textAlign: 'right',
                borderBottomWidth: 0.5,
                borderBottomColor: COLORS.DARK_GRAY,
                paddingBottom: Platform.SizeScale(1),
                height: Platform.SizeScale(18),
                paddingTop: 0,
              }}
              onFocus={onClear}
              ref={refWeight}
            />
          </View>
          <Text style={styles.medicalInfoValue} numberOfLines={1}>
            kg
          </Text>
        </View>
      </View>
    );
  }, [styles.filter, styles.medicalInfoValue, formatMessage, weight]);

  const ListFooterComponent = useCallback(
    () => (
      <View style={styles.bottomContainer}>
        <Text fontType={'BOLD_SF'} style={styles.sectionInfo}>
          {formatMessage({ id: 'medical.details_input' })}
        </Text>
        <View style={styles.medicalInfo}>
          {renderHeightSelector}
          {renderWeightSelector}
        </View>
        <Button
          style={styles.button}
          buttonStyle={BUTTON_STYLES.BLUE}
          label={formatMessage({ id: 'save' })}
          onPress={onSavePress}
        />
      </View>
    ),
    [
      styles.bottomContainer,
      styles.sectionInfo,
      styles.medicalInfo,
      styles.button,
      formatMessage,
      renderHeightSelector,
      renderWeightSelector,
      onSavePress,
    ],
  );

  const onPressOpenModal = useCallback(() => {
    symptomPicker.show(choicedSymtons, symptons);
  }, [choicedSymtons, symptomPicker, symptons]);

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'medical_history' })}
      />

      <View style={styles.contentContainer}>
        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'medical.description' })}
        </Text>

        <Touchable onPress={onPressOpenModal} style={styles.searchContainer}>
          <View style={{ width: '33%', alignItems: 'flex-end' }}>
            <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />
          </View>
          <View
            style={{
              width: '65%',
            }}>
            <Text style={styles.input}>
              {formatMessage({ id: 'medical.choose' })}
            </Text>
          </View>
        </Touchable>

        {choicedSymtons && (
          <FlatList
            data={choicedSymtons}
            renderItem={renderFilter}
            numColumns={2}
            {...{ keyExtractor, ListFooterComponent }}
          />
        )}
      </View>
    </View>
  );
});

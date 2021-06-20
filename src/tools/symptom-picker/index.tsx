import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Animated, Easing, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import _ from 'lodash';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Text, Touchable } from '@/components';
import { useAppStore, useValue } from '@/hooks';
import { Sympton } from '@/screens/pre-consultation/type';
import { COLORS, Platform, useTheme } from '@/theme';
import { SymptomPickerContext } from './context';
import { useStyleSymptomPicker } from './styles';
import { SymptomPickerContextValue, SymptomPickerProviderProps } from './types';

export const SymptomPickerProvider = ({
  children,
}: SymptomPickerProviderProps) => {
  const styles = useStyleSymptomPicker();
  const { colors } = useTheme();
  const { formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');
  const [focus, setFocus] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [symptomArr, setSymptomArr]: any = useState([]);
  const { condition } = useAppStore();

  const store = useLocalStore<{
    isVisible: boolean;
    data: Array<Sympton>;
    dataAll: Array<Sympton>;
    type: string;
    curr: number;
  }>(() => ({
    isVisible: false,
    data: [],
    dataAll: [],
    type: '',
    curr: 0,
  }));

  useEffect(() => {
    console.log('====================================');
    console.log('store', store);
    console.log('====================================');
    const list: Array<any> = [];
    store.data.map((item) => {
      list.push({
        ...item,
        isChosen: true,
      });
    });
    _.differenceBy(store.dataAll, store.data, 'id').map((item) => {
      list.push({
        ...item,
        isChosen: false,
      });
    });

    setSymptomArr(
      list.filter((item) =>
        item.name
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim()),
      ),
    );
  }, [searchText, store.data, store.dataAll, rendering, store]);

  const animation = useValue(new Animated.Value(0));

  const handleAnimation = useCallback(
    (toValue: number, callback = () => {}) => {
      Animated.timing(animation, {
        toValue,
        duration: DURATION_ANIMATION,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start(callback);
    },
    [animation],
  );

  const handleShowDialog = useCallback(
    (data, dataAll) => {
      store.isVisible = true;
      store.data = data;
      store.dataAll = dataAll;
      setRendering(true);
      handleAnimation(1);
    },
    [handleAnimation, store],
  );

  const handleCloseDialog = useCallback(() => {
    handleAnimation(0, () => {
      store.isVisible = false;
    });
    setRendering(false);
  }, [handleAnimation, store]);

  const contextValue = useMemo<SymptomPickerContextValue>(
    () => ({
      close: handleCloseDialog,
      show: handleShowDialog,
    }),
    [handleCloseDialog, handleShowDialog],
  );

  const renderItem = useCallback(
    ({ item }) => {
      function onPress() {
        const reloadArr = [...symptomArr];
        reloadArr.splice(symptomArr.indexOf(item), 1, {
          ...item,
          isChosen: !item.isChosen,
        });
        setSymptomArr(reloadArr);
      }

      return (
        <Touchable onPress={onPress} style={styles.symptomItem}>
          <View
            style={[
              styles.itemContainer,
              {
                borderColor: item.isChosen ? colors.blue : colors.transparent,
              },
            ]}>
            <Text
              style={{
                fontSize: Platform.SizeScale(15),
                color: item.isChosen ? colors.blue : colors.darkGray,
              }}>{`${item.name}`}</Text>
            {item.isChosen ? (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkboxStyle} />
              </View>
            ) : (
              <View style={styles.unCheckbox} />
            )}
          </View>
        </Touchable>
      );
    },
    [styles, colors, symptomArr],
  );

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const clearText = useCallback(() => {
    setSearchText('');
  }, []);

  const onChangeText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const onCancel = useCallback(() => {
    handleCloseDialog();
  }, [handleCloseDialog]);

  const onSave = useCallback(() => {
    const chosenSymptom = _.filter(symptomArr, function (o) {
      return o.isChosen === true;
    }).filter((item) => {
      delete item.isChosen;
      return item;
    });
    condition.setChoicedSymton(chosenSymptom);
    handleCloseDialog();
  }, [condition, handleCloseDialog, symptomArr]);

  return (
    <>
      <SymptomPickerContext.Provider value={contextValue}>
        {children}
      </SymptomPickerContext.Provider>
      <Observer>
        {() => {
          const { isVisible } = store;
          if (!isVisible) {
            return <></>;
          }
          return (
            <Modal
              backdropOpacity={0.5}
              isVisible
              animationIn={'slideInUp'}
              animationOut={'slideOutDown'}
              onBackdropPress={handleCloseDialog}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  {formatMessage({ id: 'app.list_symptoms' })}
                </Text>
                <Icon65doctor
                  name={ICONS.CLOSE}
                  color={COLORS.WHITE}
                  size={15}
                  onPress={handleCloseDialog}
                />
              </View>
              <View style={styles.container}>
                <View
                  style={[
                    styles.inputBody,
                    {
                      borderBottomColor: focus ? COLORS.BLACK : COLORS.GRAY,
                    },
                  ]}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      allowFontScaling={false}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChangeText={onChangeText}
                      value={searchText}
                      placeholder={formatMessage({ id: 'app.search_symptom' })}
                      placeholderTextColor={COLORS.DARK_GRAY}
                      style={styles.inputStyle}
                    />
                  </View>
                  <Touchable onPress={clearText} style={styles.iconContainer}>
                    <Icon65doctor
                      name={ICONS.CLOSE}
                      color={COLORS.BLACK}
                      size={10}
                    />
                  </Touchable>
                </View>
                <FlatList data={symptomArr} {...{ renderItem }} />
                <View style={styles.footer}>
                  <View style={styles.buttonContainer}>
                    <Touchable onPress={onCancel} style={styles.cancel}>
                      <Text style={styles.cancelText}>
                        {formatMessage({ id: 'app.cancel' })}
                      </Text>
                    </Touchable>
                    <Touchable onPress={onSave} style={styles.save}>
                      <Text style={styles.saveText}>
                        {formatMessage({ id: 'app.save' })}
                      </Text>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Modal>
          );
        }}
      </Observer>
    </>
  );
};

SymptomPickerContext.displayName = 'SymptomPickerProvider';
const DURATION_ANIMATION = 250;

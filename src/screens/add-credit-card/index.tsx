import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Alert, SafeAreaView, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import DropdownAlert from 'react-native-dropdownalert';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { observer, useLocalStore } from 'mobx-react';
import { CreditCard } from '@/assets';
import { Text } from '@/components';
import { useAppStore } from '@/hooks';
import { Platform, useTheme } from '@/theme';
import { alertMessage } from '@/utils/alert.helper';
import { InputPayment, TopBar } from './component';
import { useStyleAddCreditCard } from './styles';

export const AddCreditCardScreen = observer(() => {
  const [cardNumber, setCardNumber] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [focused, setFocused] = useState(0);
  const [cvv, setCvv] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { payment, appState } = useAppStore();
  const { formatMessage } = useIntl();
  const styles = useStyleAddCreditCard();
  const dropDownAlertRef: any = useRef<DropdownAlert>();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const store = useLocalStore<{
    isVisible: boolean;
    action: () => void;
  }>(() => ({
    isVisible: false,
    action: () => { },
  }));

  useEffect(() => {
    if (cardNumber.length === 0 || monthYear.length === 0 || cvv.length === 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [cardNumber.length, cvv.length, monthYear.length]);

  useEffect(() => {
    setCardNumber('');
    setCvv('');
    setMonthYear('');
    setFocused(0);
  }, [store.isVisible]);

  useEffect(() => {
    console.log('====================================');
    console.log('appState.isShowLoading', appState.isShowLoading);
    console.log('====================================');
  }, [appState.isShowLoading]);

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
    if (isDisable) {
      alertMessage(formatMessage({ id: 'app.input_required' }), () => { });
      return;
    }
    if (cardNumber.length < 19) {
      alertMessage(formatMessage({ id: 'app.card.wrong_format' }), () => { });
      return;
    } else if (cvv.length < 3) {
      alertMessage(formatMessage({ id: 'app.card.format_cvv' }), () => { });
      return;
    } else if (monthYear.length > 5) {
      alertMessage(formatMessage({ id: 'app.card.month' }), () => { });
      return;
    } else {
      const month = monthYear.slice(0, 2);
      const year = `20${monthYear.slice(3)}`;
      const now = new Date();
      console.log('====================================');
      console.log('+month < now.getMonth() + 1', +month < now.getMonth() + 1);
      console.log('====================================');
      if (+year === now.getFullYear()) {
        if (+month < now.getMonth() + 1) {
          console.log('====================================');
          console.log('123');
          console.log('====================================');
          alertMessage(formatMessage({ id: 'app.card.month.error' }), () => { });
          console.log('1');
          return;
        }
      }
      if (+month > 12) {
        alertMessage(formatMessage({ id: 'app.card.month.error' }), () => { });
        console.log('2');
        return;
      }
      if (+year < now.getFullYear()) {
        alertMessage(formatMessage({ id: 'app.card.month.error' }), () => { });
        console.log('3');
        return;
      }
      const data = {
        number: cardNumber.replace(/\\ /g, ''),
        exp_month: +month,
        exp_year: +year,
        cvc: cvv,
      };

      const response = await payment.addCard(data);
      if (response) {
        alertMessage(formatMessage({ id: 'app.success' }), () => {
          payment.getCard();
          handleGoBack();
        });
      } else {
        alertMessage(formatMessage({ id: 'app.fail' }), () => { });
      }
    }
  }, [
    cardNumber,
    cvv,
    formatMessage,
    handleGoBack,
    isDisable,
    monthYear,
    payment,
  ]);

  const setText = useCallback((text: string) => {
    setCardNumber(
      text
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  }, []);

  const setMonthInput = useCallback((text: string) => {
    const text1 = text.replace(/[^0-9 ]/g, '');
    if (text1.length > 2) {
      const month = text1?.slice(0, 2);
      const year = text1?.slice(2);
      const monthAndYear = `${month}/${year}`;
      setMonthYear(monthAndYear);
    } else {
      setMonthYear(text1);
    }
  }, []);

  const onTap = useCallback(() => {
    dropDownAlertRef?.current?.closeAction();
  }, []);

  const renderInput = () => {
    function onFocus1() {
      setFocused(1);
    }
    function onFocus2() {
      setFocused(2);
    }
    function onFocus3() {
      setFocused(3);
    }
    return (
      <View style={styles.margin15}>
        <InputPayment
          text={cardNumber}
          setText={setText}
          maxLength={19}
          placeholder={'Card number'}
          onFocus={onFocus1}
          inputStyle={
            focused === 1 && {
              borderBottomColor: colors.darkGray,
            }
          }
        />
        <View>
          <View style={styles.rowSpace}>
            <InputPayment
              text={monthYear}
              show={false}
              setText={setMonthInput}
              placeholder={'Expiry Date (MM/YY)'}
              styleContainer={styles.input2InRow}
              onFocus={onFocus2}
              maxLength={5}
              inputStyle={
                focused === 2 && {
                  borderBottomColor: colors.darkGray,
                }
              }
            />
            <InputPayment
              text={cvv}
              setText={setCvv}
              placeholder={'CVV'}
              maxLength={3}
              styleContainer={styles.input2InRow}
              onFocus={onFocus3}
              inputStyle={
                focused === 3 && {
                  borderBottomColor: colors.darkGray,
                }
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.allBackgroundWhite}>
        <DropdownAlert
          containerStyle={styles.patient}
          ref={dropDownAlertRef}
          showCancel={false}
          onTap={onTap}
          titleNumOfLines={2}
          messageNumOfLines={0}
          titleStyle={{ height: 100 }}
        />
        <KeyboardAwareScrollView>
          <TopBar setIsVisible={handleGoBack} />
          <View>
            <View>
              <AutoHeightImage
                source={CreditCard}
                width={Platform.deviceWidth}
              />
            </View>
            {renderInput()}
            <View>
              <TouchableOpacity
                disabled={disabled}
                onPress={onSubmit}
                style={styles.submitStyle}>
                <Text style={styles.white15Text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
});

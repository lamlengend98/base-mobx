import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { Button, Text, TextField } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore } from '@/hooks';
import { AuthInitInfo } from '@/models/types';
import { showErrorToast } from '@/tools';
import { verifyEmail } from '@/utils';
import { alertMessage } from '@/utils/alert.helper';
import { useStylePersonalDetails } from './styles';

export const PersonalDetailsScreen = observer(() => {
  const styles = useStylePersonalDetails();
  const { formatMessage } = useIntl();
  const { userProfile, auth } = useAppStore();
  const ref: any = useRef(null);
  const [gender, setGender] = useState(auth.data?.gender);

  console.log('====================================');
  console.log('info', auth.infoLogged);
  console.log('====================================');

  const GENDER = useMemo(() => {
    return {
      MALE: { id: 1, label: formatMessage({ id: 'personal.male' }) },
      FEMALE: { id: 2, label: formatMessage({ id: 'personal.female' }) },
    };
  }, [formatMessage]);

  const onSubmit = useCallback(
    async (values) => {
      if (isEmpty(values?.name)) {
        showErrorToast(formatMessage({ id: 'error.first_name.empty' }));
      } else if (!verifyEmail(values?.email) && isEmpty(values?.email)) {
        showErrorToast(formatMessage({ id: 'error.email.invalid' }));
      } else {
        const body = {
          area_code_id: values.area_code_id,
          name: values?.name,
          email: values?.email,
          phone: values.phone,
          gender,
        };
        const res = await userProfile.postProfile(auth?.data.id, body);
        if (res.status) {
          alertMessage(formatMessage({ id: 'app.success' }), () =>
            auth.updateInfo(res),
          );
        } else {
          alertMessage(formatMessage({ id: 'app.fail' }));
        }
        return;
      }
    },
    [auth, formatMessage, gender, userProfile],
  );

  const onMaleSelected = useCallback(() => {
    setGender(GENDER.MALE.label.toUpperCase());
  }, [GENDER]);

  const onFemaleSelected = useCallback(() => {
    setGender(GENDER.FEMALE.label.toUpperCase());
  }, [GENDER]);

  console.log('====================================');
  console.log('data', auth.data);
  console.log('====================================');

  useEffect(() => {
    if (auth.infoDetail?.data) {
      ref.current?.setValues(auth.infoDetail?.data);
    } else if (auth.data) {
      ref.current?.setValues(auth.data);
    }
  }, [auth.data, auth.infoDetail?.data]);

  return (
    <Formik innerRef={ref} {...{ onSubmit }} initialValues={{}}>
      {({
        values,
        handleChange,
        submitForm,
      }: {
        values: AuthInitInfo;
        handleChange: any;
        submitForm: any;
      }) => {
        return (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text fontType={'BOLD_RB'} style={styles.title}>
                {formatMessage({ id: 'personal.details' })}
              </Text>
            </View>

            <View style={styles.content}>
              <TextField
                maxLength={50}
                style={styles.inputContainer}
                value={values?.name || ''}
                placeholder={formatMessage({ id: 'personal.name' })}
                onChangeText={handleChange('name')}
              />

              <TextField
                maxLength={50}
                style={styles.inputContainer}
                value={values?.email || ''}
                placeholder={formatMessage({ id: 'personal.email' })}
                onChangeText={handleChange('email')}
              />

              <Text fontType={'REGULAR_RB'} style={styles.centredText}>
                {formatMessage({ id: 'personal.gender' })}
              </Text>
              <View style={styles.dateContainer}>
                <Button
                  style={styles.buttonGenderLeft}
                  buttonStyle={
                    gender === GENDER.MALE.label.toUpperCase()
                      ? BUTTON_STYLES.GREEN
                      : BUTTON_STYLES.WHITE
                  }
                  label={GENDER.MALE.label}
                  onPress={onMaleSelected}
                />
                <Button
                  style={styles.buttonGenderRight}
                  buttonStyle={
                    gender === GENDER.FEMALE.label.toUpperCase()
                      ? BUTTON_STYLES.GREEN
                      : BUTTON_STYLES.WHITE
                  }
                  label={GENDER.FEMALE.label}
                  onPress={onFemaleSelected}
                />
              </View>
              <Button
                style={styles.button}
                buttonStyle={BUTTON_STYLES.BLUE}
                label={formatMessage({ id: 'personal.save' })}
                onPress={submitForm}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
});

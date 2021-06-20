import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import {
  AppBars,
  Button,
  Switch,
  Text,
  TextField,
  Touchable,
} from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore } from '@/hooks';
import { useTheme } from '@/theme';
import { showErrorToast } from '@/tools';
import { getDisplayedAvatar, verifyEmail } from '@/utils';
import { alertMessage } from '@/utils/alert.helper';
import { mocksData } from './__mocks__/profile';
import { useStylePersonalProfile } from './styles';

export const PersonalProfileScreen = observer(() => {
  const styles = useStylePersonalProfile();
  const { formatMessage } = useIntl();

  const { userProfile, auth, appState } = useAppStore();
  const profile = userProfile?.data;
  const patientProfile = userProfile?.patientProfile?.data;
  const [notifyEmail, setNotifyEmail] = useState(mocksData.profile.notifyEmail);
  const [notifySms, setNotifySms] = useState(mocksData.profile.notifySms);
  const { colors } = useTheme();
  const ref: any = useRef(null);
  const [imageParam, setImageParams] = useState<any>({});
  const [gender, setGender] = useState(
    userProfile?.patientProfile?.data?.gender,
  );

  const GENDER = useMemo(() => {
    return {
      MALE: { id: 1, label: formatMessage({ id: 'personal.male' }) },
      FEMALE: { id: 2, label: formatMessage({ id: 'personal.female' }) },
    };
  }, [formatMessage]);

  useEffect(() => {
    if (patientProfile) {
      ref?.current?.setValues(patientProfile);
    }
  }, [patientProfile]);

  useEffect(() => {
    userProfile.getProfile(auth?.data.id);
  }, [auth?.data.id, userProfile]);

  const onToggleNotifyEmail = useCallback((isOn) => {
    setNotifyEmail(isOn);
  }, []);

  const onToggleNotifySms = useCallback((isOn) => {
    setNotifySms(isOn);
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      if (isEmpty(values?.name)) {
        showErrorToast(formatMessage({ id: 'error.first_name.empty' }));
      } else if (isEmpty(values?.email) || !verifyEmail(values?.email)) {
        showErrorToast(formatMessage({ id: 'error.email.invalid' }));
      } else {
        const body = {
          area_code_id: values?.area_code_id,
          name: values?.name,
          email: values?.email,
          phone: values?.phone,
          image: values?.image,
          gender,
          ...imageParam,
        };
        const form_data = new FormData();

        for (const key in body) {
          form_data.append(key, body[key]);
        }
        appState.setIsShowLoading(true);
        const res: any = await userProfile.postProfileWithAvatar(
          auth?.data.id,
          form_data,
          auth.infoLogged?.access_token,
        );
        appState.setIsShowLoading(false);
        if (res.status) {
          alertMessage(formatMessage({ id: 'app.success' }));
        } else {
          alertMessage(formatMessage({ id: 'app.fail' }));
        }
        return;
      }
    },
    [
      formatMessage,
      gender,
      imageParam,
      appState,
      userProfile,
      auth?.data.id,
      auth.infoLogged?.access_token,
    ],
  );

  const userAvatar = useMemo(() => {
    return imageParam?.image?.uri
      ? { uri: imageParam?.image?.uri }
      : { uri: patientProfile?.image } || getDisplayedAvatar(profile?.image);
  }, [imageParam, patientProfile?.image, profile?.image]);

  const chooseImage = useCallback(() => {
    ImagePicker.openPicker({
      writeTempFile: true,
    }).then((image) => {
      image.filename =
        image.filename ||
        Math.floor(Math.random() * Math.floor(999999999)) + '.jpg';
      const imageObject = {
        name: image.filename,
        size: image.size,
        type: image.mime,
        lastModified: +moment().format('X'),
        uri: image.path,
        lastModifiedDate: moment().toDate(),
        webkitRelativePath: '',
      };
      setImageParams({
        image: imageObject,
      });
    });
  }, []);
  const onMaleSelected = useCallback(() => {
    setGender(GENDER.MALE.label.toUpperCase());
  }, [GENDER]);

  const onFemaleSelected = useCallback(() => {
    setGender(GENDER.FEMALE.label.toUpperCase());
  }, [GENDER]);

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'edit_profile' })}
      />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <Touchable onPress={chooseImage}>
            <FastImage
              source={userAvatar}
              resizeMode="cover"
              style={styles.avatar}
            />
          </Touchable>
        </View>
        <Formik initialValues={patientProfile} innerRef={ref} {...{ onSubmit }}>
          {({ values, handleChange, submitForm }) => {
            return (
              <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                  <Text fontType={'MEDIUM_SF'} style={styles.title}>
                    {patientProfile?.name}
                  </Text>
                  <Text style={styles.title}>{patientProfile?.email}</Text>
                </View>

                <TextField
                  fontType={'REGULAR_SF'}
                  maxLength={50}
                  style={styles.input}
                  value={values?.name}
                  placeholder={formatMessage({ id: 'personal.first_name' })}
                  onChangeText={handleChange('name')}
                  placeholderTextColor={colors.darkGray2}
                />
                <TextField
                  fontType={'REGULAR_SF'}
                  maxLength={50}
                  style={styles.input}
                  value={values?.email}
                  placeholder={formatMessage({ id: 'personal.email' })}
                  onChangeText={handleChange('email')}
                  placeholderTextColor={colors.darkGray2}
                />
                <Text fontType={'REGULAR_RB'} style={styles.centredText}>
                  {formatMessage({ id: 'personal.gender' })}
                </Text>
                <View style={styles.dateContainer}>
                  <View style={{ width: '47.5%' }}>
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
                  </View>
                  <View style={{ width: '47.5%' }}>
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
                </View>

                <Button
                  style={styles.button}
                  buttonStyle={BUTTON_STYLES.BLUE}
                  label={formatMessage({ id: 'save' })}
                  onPress={submitForm as any}
                />

                <View style={styles.notification}>
                  <Text fontType={'MEDIUM_SF'} style={styles.title}>
                    {formatMessage({ id: 'turn_on_notification' })}
                  </Text>

                  <View style={styles.notificationGroup}>
                    <Switch
                      label={formatMessage({ id: 'personal.email' })}
                      isOn={notifyEmail}
                      onToggle={onToggleNotifyEmail}
                    />

                    <Switch
                      label={formatMessage({ id: 'sms' })}
                      isOn={notifySms}
                      onToggle={onToggleNotifySms}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
});

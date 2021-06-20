import React, { useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { AppBars, Button, Text, TextField } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { useTheme } from '@/theme';
import { showErrorToast } from '@/tools';
import { alertMessage } from '@/utils/alert.helper';
import { useStyleActiveMemberCode } from './styles';

export const ActiveMemberCodeScreen = observer(() => {
  const styles = useStyleActiveMemberCode();
  const { formatMessage } = useIntl();
  const { clinic, auth } = useAppStore();
  const inputRef: any = useRef();
  const { colors } = useTheme();

  useEffect(() => {
    inputRef && inputRef?.current?.focus();
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      if (isEmpty(values.code)) {
        showErrorToast(formatMessage({ id: 'error.code.empty' }));
      } else {
        const data = {
          user_id: auth.data.id,
          invite_code: values?.code,
        };
        const res = await clinic.confirmInviteCode(data);
        if (!res) {
          alertMessage(formatMessage({ id: 'app.code.error' }), () => {});
        } else {
          clinic.getAllClinics(auth.data?.id);
          NavigationService.navigate(ROUTES.CLINIC_STACK, {
            user_id: auth.data.id,
          });
        }
      }
    },
    [auth.data.id, clinic, formatMessage],
  );

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'active_member_code' })}
      />

      <Text fontType={'BOLD_SF'} style={styles.title}>
        {formatMessage({ id: 'active_code.question' })}
      </Text>
      <Text style={styles.description}>
        {formatMessage({ id: 'active_code.description' })}
      </Text>

      <Formik initialValues={{ code: '' }} {...{ onSubmit }}>
        {({ submitForm, handleChange, values }) => (
          <View style={styles.inputContainer}>
            <TextField
              maxLength={8}
              style={styles.input}
              onChangeText={handleChange('code')}
              textAlign="center"
              ref={inputRef}
              placeholder={formatMessage({ id: 'active_code.enter' })}
              placeholderTextColor={colors.darkGray}
            />

            <Button
              style={styles.button}
              buttonStyle={BUTTON_STYLES.BLUE}
              label={formatMessage({ id: 'active_code.apply' })}
              onPress={submitForm}
            />
          </View>
        )}
      </Formik>
    </View>
  );
});

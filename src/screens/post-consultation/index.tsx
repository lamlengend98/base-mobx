import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import appStore from '@/app-store/app-store';
import { DefaultProfile } from '@/assets';
import { Button, Rate, Text, TextField } from '@/components';
import { useAppStore } from '@/hooks';
import { DoctorInfo } from '@/models/types';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { CallInfo } from '@/tools/agora/types';
import { useStylePostConsultation } from './styles';
import { PostConsultationProps } from './types';

export const PostConsultationScreen = ({ route }: PostConsultationProps) => {
  const styles = useStylePostConsultation();
  const { formatMessage } = useIntl();
  const [note, setNote] = useState('');
  const [star, setStar] = useState(4);
  const { call, doctor }: { call: CallInfo; doctor: DoctorInfo } = useMemo(
    () => route.params,
    [route.params],
  );
  const { condition } = useAppStore();
  console.log(
    `🛠 LOG: 🚀 --> --------------------------------------------------------------------------------`,
  );
  console.log(
    `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 24 ~ PostConsultationScreen ~ call`,
    call,
  );
  console.log(
    `🛠 LOG: 🚀 --> --------------------------------------------------------------------------------`,
  );

  const hanSubmit = useCallback(async () => {
    try {
      appStore.appState.isShowLoading = true;
      await condition.submitReview(note, star, call.id);
      NavigationService.navigate(ROUTES.HOME, {});
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      appStore.appState.isShowLoading = false;
    }
  }, [call.id, condition, note, star]);

  const onClose = useCallback(() => {
    NavigationService.navigate(ROUTES.HOME, {});
  }, []);

  function onRate(percent: number) {
    setStar(percent);
  }

  const onChangeText = (text: string) => {
    setNote(text);
  };

  return (
    <KeyboardAwareScrollView style={styles.awareScrollView} nestedScrollEnabled>
      <View style={styles.container}>
        <Text fontType="BOLD_SF" style={styles.title}>
          {formatMessage({ id: 'post.consultation.title' })}
        </Text>
        <View style={styles.circle1}>
          <View style={styles.circle2}>
            <View style={styles.circle3}>
              <FastImage
                source={{ uri: doctor?.picture } || DefaultProfile}
                resizeMode="center"
                style={styles.avatar}
              />
            </View>
          </View>
        </View>
        <Text fontType="BOLD_SF" style={styles.name}>
          {doctor?.name}
        </Text>
        <Text fontType="REGULAR_SF" style={styles.review}>
          {formatMessage({ id: 'post.consultation.review' })}
        </Text>
        <Rate
          percent={star}
          style={styles.rate}
          activeColor="yellow"
          inActiveColor="gray"
          onPress={onRate}
        />
        <TextField
          multiline
          textAlignVertical="top"
          placeholder={formatMessage({
            id: 'post.consultation.input.placeholder',
          })}
          inputStyle={styles.inputStyle}
          style={styles.inputReview}
          {...{ onChangeText }}
        />
        <View style={styles.rateOnGroup}>
          <Button
            buttonStyle="BLUE"
            style={styles.btnRate}
            onPress={hanSubmit}
            label={formatMessage({ id: 'post.consultation.submit' })}
          />
          <Button
            buttonStyle="GRAY"
            labelColor="white"
            style={styles.btnRate}
            onPress={onClose}
            label={formatMessage({ id: 'post.consultation.close' })}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import {
  AppBars,
  Button,
  PreConsultationItem,
  Text,
  TextField,
} from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { PreConsultationProps } from '@/components/items/item-pre-consultation/type';
import { Loading } from '@/components/Loading';
import { useAppStore } from '@/hooks';
import { ROUTES } from '@/stack';
import { alertMessage } from '@/utils/alert.helper';
import { useStylePreConsultation } from './styles';
import { Sympton } from './type';

export const PreConsultationScreen = observer(({ navigation }) => {
  const styles = useStylePreConsultation();
  const { formatMessage } = useIntl();
  const [selectedConsultation, setSelectedConsultation] = useState<Sympton[]>(
    [],
  );
  const { condition } = useAppStore();
  const { isLoading } = condition;

  // lấy tất cả triệu chứng
  useEffect(() => {
    condition.getSymptons();
  }, [condition]);

  useEffect(() => {
    condition.setChoicedSymton(selectedConsultation);
  }, [condition, selectedConsultation]);

  // unmount
  useEffect(() => {
    () => {
      condition.reset();
    };
  }, [condition]);

  const onSubmitPress = useCallback(() => {
    if (!condition.choicedSymtons) {
      // check đã chọn triệu chứng
      alertMessage(
        formatMessage({ id: 'pre.consultation.nosymton' }),
        () => {},
      );
      return;
    }
    navigation.navigate(ROUTES.SYMPTOM, {});
  }, [condition.choicedSymtons, formatMessage, navigation]);

  const onChangeText = useCallback(
    (text: string) => {
      condition.setText(text);
    },
    [condition],
  );

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const onItemPress = useCallback(
    (item: Sympton) => {
      if (_.find(selectedConsultation, item)) {
        setSelectedConsultation(
          _.filter(
            selectedConsultation,
            (sympton: Sympton) => sympton.id !== item.id,
          ),
        );
        return;
      }
      setSelectedConsultation([...selectedConsultation, item]);
    },
    [selectedConsultation],
  );

  const renderClinicItem = useCallback(
    ({ item }: PreConsultationProps) => {
      return (
        <PreConsultationItem
          item={item}
          isSelected={!!_.find(selectedConsultation, item)}
          {...{ onItemPress }}
        />
      );
    },
    [onItemPress, selectedConsultation],
  );

  const ListHeaderComponent = useMemo(() => {
    return (
      <Text fontType={'BOLD_SF'} style={styles.section}>
        {formatMessage({ id: 'pre.consultation.question' })}
      </Text>
    );
  }, [formatMessage, styles.section]);

  const ListFooterComponent = useMemo(() => {
    return (
      <>
        <Text fontType={'BOLD_SF'} style={styles.section}>
          {formatMessage({ id: 'pre.consultation.description' })}
        </Text>
        <TextField
          style={styles.input}
          multiline
          fontType={'REGULAR_SF'}
          placeholder={formatMessage({
            id: 'pre.consultation.hint',
          })}
          onChangeText={onChangeText}
        />

        <Button
          style={styles.button}
          buttonStyle={BUTTON_STYLES.BLUE}
          fontType={'MEDIUM_SF'}
          label={formatMessage({ id: 'post.consultation.submit' })}
          onPress={onSubmitPress}
        />
      </>
    );
  }, [
    styles.section,
    styles.input,
    styles.button,
    formatMessage,
    onChangeText,
    onSubmitPress,
  ]);

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'pre.consultation.title' })}
      />
      <Loading isLoading={isLoading} />
      <FlatList
        data={toJS(condition.symptons)}
        renderItem={renderClinicItem}
        numColumns={4}
        {...{ keyExtractor, ListHeaderComponent, ListFooterComponent }}
      />
    </View>
  );
});

import React, { memo, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { ItemAreaCode, Text, TextField } from '@/components';
import { useAppStore } from '@/hooks';
import { useTheme } from '@/theme';
import { useStyleLoginPhone } from './styles';
import { AreaCodeProps } from './types';

const _AreaCodes = observer(
  ({
    onChangeAreacode,
    onChangeAreacodeId,
    onPressPhoneCode,
  }: {
    onChangeAreacode: (text: string) => void;
    onChangeAreacodeId: (text: string) => void;
    onPressPhoneCode: () => void;
  }) => {
    const styles = useStyleLoginPhone();
    const { auth } = useAppStore();
    const { colors } = useTheme();
    const { formatMessage } = useIntl();
    const [areacodes, setAreacodes] = useState<AreaCodeProps[]>([]);
    const [searchText, setSearchText] = useState('');

    const keyExtractor = useCallback(
      (item: any, index: number) => index?.toString(),
      [],
    );

    const onChangeTextSearch = _.debounce(
      (text: string) => {
        const result = auth.areacodes.filter((item) =>
          item.areaName.toLowerCase().includes(text.toLowerCase()),
        );

        setAreacodes(result);
        setSearchText(text);
      },
      400,
      { leading: false, trailing: true },
    );

    useEffect(() => {
      setAreacodes(auth.areacodes);
    }, []);

    const ListEmptyComponent = useCallback(() => {
      return (
        <View>
          <Text>khong tim thay</Text>
        </View>
      );
    }, []);

    const renderAreacodeItem = useCallback(
      ({ item, index }: { item: AreaCodeProps; index: number }) => {
        return (
          <ItemAreaCode
            key={index}
            {...{
              item,
              index,
              onChangeAreacode,
              onChangeAreacodeId,
              onPressPhoneCode,
            }}
          />
        );
      },
      [onChangeAreacode, onChangeAreacodeId, onPressPhoneCode],
    );

    return (
      <View style={styles.list}>
        <View style={{}}>
          <TextField
            keyboardType={'default'}
            maxLength={13}
            style={styles.inputSearchAreacode}
            placeholder={formatMessage({ id: 'otp.areacode' })}
            placeholderTextColor={colors.darkGray}
            onChangeText={onChangeTextSearch}
          />
        </View>
        <FlatList
          data={areacodes}
          renderItem={renderAreacodeItem}
          {...{ keyExtractor, ListEmptyComponent }}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  },
);

export default memo(_AreaCodes);

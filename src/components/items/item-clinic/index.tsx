import React, { useCallback } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@/theme';
import { getDisplayedAvatarClinic } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemNotification } from './styles';
import { ClinicProps } from './types';

const _ClinicItem = ({ item, onItemPress, index }: ClinicProps) => {
  const styles = useStylesItemNotification();
  const { colors } = useTheme();
  const _onItemPress = useCallback(() => {
    return item && onItemPress?.(item);
  }, [onItemPress, item]);

  return (
    <Touchable
      style={[
        styles.container,
        {
          backgroundColor:
            index % 2 === 0 ? styles.container.backgroundColor : colors.gray,
        },
      ]}
      onPress={_onItemPress}>
      <View style={styles.content}>
        <Text fontType={'BOLD_SF'} style={styles.title} numberOfLines={2}>
          {item?.clinic_name || ''}
        </Text>
        <Text
          style={
            styles.info
          }>{`${item?.clinic_phone} ${item?.clinic_website}`}</Text>
        <Text isViewHtml style={styles.address} numberOfLines={2}>
          {item?.clinic_address}
        </Text>
      </View>
      <FastImage
        source={getDisplayedAvatarClinic(item?.clinic_avatar)}
        resizeMode="contain"
        style={styles.avatar}
      />
    </Touchable>
  );
};

export const ClinicItem = React.memo(_ClinicItem);

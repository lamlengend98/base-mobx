import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getDisplayedAvatar } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemDoctor } from './styles';
import { DoctorReviewProps } from './type';

const _DoctorReviewItem = ({ item, onItemPress }: DoctorReviewProps) => {
  const styles = useStylesItemDoctor();

  const _onItemPress = useCallback(() => {
    return item && onItemPress?.(item);
  }, [onItemPress, item]);

  const doctorAvatar = useMemo(() => {
    return getDisplayedAvatar(item?.photo);
  }, [item?.photo]);

  return (
    <Touchable style={styles.container} onPress={_onItemPress}>
      <View style={styles.avatarContainer}>
        <FastImage
          source={doctorAvatar}
          resizeMode="cover"
          style={styles.avatar}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text fontType={'BOLD_SF'} style={styles.name} numberOfLines={2}>
          {item?.name}
        </Text>
        <Text isLongText numberOfLines={1}>
          {item?.specialty}
        </Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text fontType={'BOLD_SF'} style={styles.rating}>
          {item?.ratingAvg || 0}
        </Text>
      </View>
    </Touchable>
  );
};

export const DoctorReviewItem = React.memo(_DoctorReviewItem);

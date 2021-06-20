import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { getDisplayedImage } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemDate } from './styles';
import { PreConsultationProps } from './type';

const _PreConsultationItem = ({
  item,
  isSelected,
  onItemPress,
}: PreConsultationProps) => {
  const styles = useStylesItemDate();

  const _onItemPress = useCallback(() => {
    return item && onItemPress?.(item);
  }, [onItemPress, item]);

  const pictureStyle = useMemo(() => {
    return [styles.avatar, isSelected ? styles.selected : styles.unselected];
  }, [styles, isSelected]);

  const preConsultationPicture = useMemo(() => {
    return getDisplayedImage(item?.image);
  }, [item?.image]);

  const tickIcon = useMemo(
    () =>
      isSelected && (
        <View style={styles.iconStatusContainer}>
          <Icon65doctor name={ICONS.DONE} style={styles.iconStatus} />
        </View>
      ),
    [isSelected, styles.iconStatus, styles.iconStatusContainer],
  );

  return (
    <Touchable style={styles.container} onPress={_onItemPress}>
      <FastImage
        source={preConsultationPicture}
        resizeMode="cover"
        style={pictureStyle}
      />

      <Text style={styles.name}>{item?.name}</Text>
      {tickIcon}
    </Touchable>
  );
};

export const PreConsultationItem = React.memo(_PreConsultationItem);

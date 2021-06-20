import React, { useCallback } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@/theme';
import { CategoryProps } from '@/types/category';
import { getSpecilityImage } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemCategory } from './styles';

const _CategoryItem = ({ item, onPress }: CategoryProps) => {
  const styles = useStylesItemCategory();
  const { colors } = useTheme();

  const _onPress = useCallback(() => {
    return item && onPress?.(item);
  }, [onPress, item]);

  return (
    <Touchable style={styles.container} onPress={_onPress}>
      <View style={styles.avatarContainer}>
        <FastImage
          source={getSpecilityImage(item?.image)}
          resizeMode="contain"
          style={styles.avatar}
          tintColor={colors.lightBlue}
        />
      </View>
      <Text style={styles.name} isLongText numberOfLines={1}>
        {item?.name}
      </Text>
    </Touchable>
  );
};

export const CategoryItem = React.memo(_CategoryItem);

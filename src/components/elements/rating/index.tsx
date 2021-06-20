import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Icon65doctor } from '@/assets/icons';
import { ICONS } from '@/assets/icons/constants';
import { useTheme } from '@/theme';
import { Touchable } from '../touchable';
import { useStylesRate } from './styles';
import { RateProps } from './types';

function RateBase({
  numStar = 5,
  percent = 0,
  style,
  onPress,
  activeColor,
  inActiveColor,
}: RateProps) {
  const styles = useStylesRate();
  const [star, setStar] = useState(percent);

  return (
    <View style={styles.container}>
      {Array.from(Array(numStar)).map((_, index) => (
        <Star
          {...{
            percent: star,
            index,
            inActiveColor,
            activeColor,
            style,
            onPress,
            setStar,
          }}
          key={index + '_start'}
        />
      ))}
    </View>
  );
}

const Star = ({
  percent,
  onPress,
  index,
  inActiveColor,
  activeColor,
  style,
  setStar,
}) => {
  const styles = useStylesRate();
  const { colors } = useTheme();

  const onChangeStar = useCallback(() => {
    if (onPress) {
      onPress(index + 1);
      setStar(index + 1);
    }
  }, [index, onPress, setStar]);
  return (
    <Touchable onPress={onChangeStar}>
      <Icon65doctor
        name={ICONS.STAR}
        style={[
          index >= percent
            ? [
                styles.inActive,
                !inActiveColor ? {} : { color: colors[inActiveColor] },
              ]
            : [
                styles.active,
                !activeColor ? {} : { color: colors[activeColor] },
              ],
          style,
        ]}
      />
    </Touchable>
  );
};

export const Rate = memo(RateBase);

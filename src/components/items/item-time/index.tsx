import React, { useCallback, useMemo } from 'react';
import { TimeProps } from '@/types/time';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemTime } from './styles';

const _TimeItem = ({ item, isSelected, onPress }: TimeProps) => {
  const styles = useStylesItemTime();

  const _onPress = useCallback(() => {
    return item && onPress?.(item);
  }, [onPress, item]);

  const [getContainerStyle, getTextStyle] = useMemo(() => {
    return [
      [styles.container, isSelected ? styles.selected : styles.unselected],
      isSelected ? styles.selectedText : styles.unselectedText,
    ];
  }, [styles, isSelected]);

  return (
    <Touchable style={getContainerStyle} onPress={_onPress}>
      <Text fontType={'REGULAR_SF'} style={getTextStyle}>
        {item?.time}
      </Text>
    </Touchable>
  );
};

export const TimeItem = React.memo(_TimeItem);

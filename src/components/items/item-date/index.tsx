import React, { useCallback, useMemo } from 'react';
import { DateProps } from '@/types/date';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemDate } from './styles';

const _DateItem = ({ item, isSelected, onPress }: DateProps) => {
  const styles = useStylesItemDate();

  const _onPress = useCallback(() => {
    return item && onPress?.(item);
  }, [onPress, item]);

  const [getStyle, getTextStyle] = useMemo(() => {
    return [
      [styles.container, isSelected ? styles.selected : styles.unselected],
      isSelected ? styles.selectedText : styles.unselectedText,
    ];
  }, [styles, isSelected]);

  return (
    <Touchable style={getStyle} onPress={_onPress}>
      <Text fontType={'REGULAR_SF'} style={getTextStyle}>
        {item?.dayOfWeek?.toUpperCase()}
      </Text>
      <Text fontType={'BOLD_SF'} style={[styles.dayOfMonth, getTextStyle]}>
        {item?.dayOfMonth}
      </Text>
      <Text fontType={'REGULAR_SF'} style={getTextStyle}>
        {item?.month}
      </Text>
    </Touchable>
  );
};

export const DateItem = React.memo(_DateItem);

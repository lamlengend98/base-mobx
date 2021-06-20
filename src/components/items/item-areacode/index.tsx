import React, { memo, useCallback } from 'react';
import { Text, Touchable } from '@/components/elements';
import { AreaCodeProps } from '@/screens/login-phone/types';
import { useStylesItemAreacode } from './styles';

const _ItemAreaCode = ({
  item,
  index,
  onChangeAreacode,
  onChangeAreacodeId,
  onPressPhoneCode,
}: {
  item: AreaCodeProps;
  index: number;
  onChangeAreacode: (text: string) => void;
  onChangeAreacodeId: (text: string) => void;
  onPressPhoneCode: () => void;
}) => {
  const styles = useStylesItemAreacode();
  const onPress = useCallback(() => {
    onChangeAreacode(item.areaCode);
    onChangeAreacodeId(item.id.toString());
    onPressPhoneCode();
  }, [
    item.areaCode,
    item.id,
    onChangeAreacode,
    onChangeAreacodeId,
    onPressPhoneCode,
  ]);
  return (
    <Touchable {...{ onPress }} style={styles.container}>
      <Text>{item.areaName}</Text>
      <Text>+{item.areaCode}</Text>
    </Touchable>
  );
};

export const ItemAreaCode = memo(_ItemAreaCode);

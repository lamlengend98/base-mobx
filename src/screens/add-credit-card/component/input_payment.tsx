import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Text } from '@/components/elements';
import { COLORS, Platform, useTheme } from '@/theme';

const InputPayment = (props) => {
  const {
    text,
    setText,
    label,
    placeholder,
    styleContainer,
    inputStyle,
    onFocus,
  } = props;
  const { colors } = useTheme();
  return (
    <View style={{ marginVertical: Platform.SizeScale(10), ...styleContainer }}>
      {label && (
        <Text
          style={{
            marginBottom: Platform.SizeScale(5),
          }}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        allowFontScaling={false}
        placeholder={placeholder}
        value={text}
        onFocus={onFocus}
        onChangeText={setText}
        style={[
          {
            height: Platform.SizeScale(40),
            paddingVertical: Platform.SizeScale(10),
            marginHorizontal: Platform.SizeScale(5),
            borderBottomWidth: 1.5,
            borderBottomColor: colors.transparent,
          },
          inputStyle,
        ]}
        keyboardType={'number-pad'}
      />
    </View>
  );
};
export default InputPayment;

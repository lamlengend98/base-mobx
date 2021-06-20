import React, { useCallback, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/components';
import { useStyleOtpInput } from './styles';

const CODE_LENGTH = 6;
export const OTP = (props) => {
  const { setCode, code } = props;
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const style = useStyleOtpInput();

  const codeDigitsArray = [1, 2, 3, 4, 5, 6];

  const ref = useRef<TextInput>(null);

  const handleOnPress = useCallback(() => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  }, []);

  const handleOnBlur = useCallback(() => {
    setContainerIsFocused(false);
  }, []);

  const toDigitInput = (idx: number) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...style.inputContainer, ...style.inputContainerFocused }
        : style.inputContainer;

    return (
      <View key={idx} style={containerStyle}>
        <Text style={style.inputText}>{digit}</Text>
      </View>
    );
  };
  return (
    <View style={style.container}>
      <Pressable style={style.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map((item, index) => {
          return toDigitInput(index);
        })}
      </Pressable>
      <TextInput
        ref={ref}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={style.hiddenCodeInput}
      />
    </View>
  );
};

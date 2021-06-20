import React, { forwardRef, Ref } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableProps } from './types';

export const Touchable = forwardRef(
  (
    { children, style, handleSubmit, onPress, ...props }: TouchableProps,
    ref?: Ref<TouchableOpacity>,
  ) => {
    if (Platform.OS === 'android') {
      const canUseForground = TouchableNativeFeedback.canUseNativeForeground();

      return (
        <TouchableNativeFeedback
          useForeground={canUseForground ? true : false}
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={handleSubmit || onPress}
          {...props}>
          <View ref={ref} style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        ref={ref}
        style={style}
        onPress={handleSubmit || onPress}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  },
);

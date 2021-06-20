import React, { forwardRef, Ref, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useLayout } from '@react-native-community/hooks';
import { Icon65doctor } from '@/assets';
import { useTheme } from '@/theme';
import { Text } from '../text';
import { Touchable } from '../touchable';
import { FONT_TYPES } from './constants';
import { useStylesTextField } from './styles';
import { TextFiledProps } from './types';

export const TextField = forwardRef(
  (
    {
      fontType = 'MEDIUM_RB',
      style,
      renderLeftAccessory,
      renderRightAccessory,
      inputStyle,
      label,
      labelStyle,
      labelContentStyle,
      prefix,
      suffix,
      prefixStyle,
      secureTextEntry,
      ...other
    }: TextFiledProps,
    ref: Ref<TextInput>,
  ) => {
    const { typography } = useTheme();
    const styles = useStylesTextField();
    const [showSecureTextEntry, setSecureTextEntry] = useState(false);
    const { onLayout, height } = useLayout();

    const { colors } = useTheme();

    const contentRight = useMemo(() => {
      if (!secureTextEntry) {
        return renderRightAccessory?.();
      }
      if (!renderRightAccessory) {
        function showPassword() {
          setSecureTextEntry((prev) => !prev);
        }
        return (
          <Touchable onPress={showPassword}>
            <Icon65doctor
              name={
                showSecureTextEntry
                  ? Icon65doctor.icons.UNHIDDEN
                  : Icon65doctor.icons.HIDDEN
              }
              style={styles.iconHidden}
            />
          </Touchable>
        );
      }
      return renderRightAccessory?.();
    }, [
      renderRightAccessory,
      secureTextEntry,
      showSecureTextEntry,
      styles.iconHidden,
    ]);

    return (
      <View style={[styles.content, style]}>
        {!!label && (
          <View
            {...{ onLayout }}
            style={[styles.vLabel, { top: -height / 2 }, labelContentStyle]}>
            <Text
              style={[
                typography[FONT_TYPES[fontType]],
                styles.label,
                labelStyle,
              ]}>
              {label}
            </Text>
          </View>
        )}
        {renderLeftAccessory?.()}
        {!!prefix && (
          <Text
            style={[
              typography[FONT_TYPES[fontType]],
              styles.prefix,
              prefixStyle,
            ]}>
            {prefix}
          </Text>
        )}
        <TextInput
          allowFontScaling={false}
          style={[styles.input, typography[FONT_TYPES[fontType]], inputStyle]}
          underlineColorAndroid="transparent"
          secureTextEntry={!showSecureTextEntry && secureTextEntry}
          placeholderTextColor={colors.gray}
          {...{ ref, ...other }}
        />
        {!!suffix && (
          <Text style={[typography[FONT_TYPES[fontType]], styles.prefix]}>
            {suffix}
          </Text>
        )}
        {contentRight}
      </View>
    );
  },
);

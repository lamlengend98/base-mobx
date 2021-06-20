import React, { useMemo } from 'react';
import { ActivityIndicator, Image, TextStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../text';
import { Touchable } from '../touchable';
import { BUTTON_STYLES } from './constants';
import { useStyleButton } from './styles';
import { ButtonProps } from './types';

export const Button = ({
  label,
  style,
  buttonStyle,
  fontType = 'REGULAR_SF',
  icon,
  isLoading,
  onPress,
  isShadow,
  labelColor,
  indicatorColor = 'red',
  disabled,
  textProps,
}: ButtonProps) => {
  const styles = useStyleButton();
  const { colors } = useTheme();

  const getContainerStyle = useMemo(() => {
    let containerStyle = {};
    switch (buttonStyle) {
      case BUTTON_STYLES.BLUE:
        containerStyle = styles.blueButton;
        break;
      case BUTTON_STYLES.DARK_BLUE:
        containerStyle = styles.darkBlueButton;
        break;
      case BUTTON_STYLES.GREEN:
        containerStyle = styles.lightGreenButton;
        break;
      case BUTTON_STYLES.GRAY:
        containerStyle = styles.grayButton;
        break;

      case BUTTON_STYLES.RED:
        containerStyle = styles.redButton;
        break;

      case BUTTON_STYLES.WHITE:
      default:
        containerStyle = styles.whiteButton;
    }

    return [
      styles.container,
      containerStyle,
      isShadow ? styles.shadowView : {},
      style,
    ];
  }, [buttonStyle, styles, isShadow, style]);

  const getTextStyle = useMemo<TextStyle[]>(() => {
    let color;
    switch (buttonStyle) {
      case BUTTON_STYLES.WHITE:
      case BUTTON_STYLES.GREEN:
      case BUTTON_STYLES.GRAY:
        color = colors.inputLabel;
        break;
      default:
        color = colors.white;
        break;
    }

    if (labelColor) {
      color = labelColor;
    }

    return [{ color }, !icon ? { flex: 1, textAlign: 'center' } : {}];
  }, [buttonStyle, colors.inputLabel, colors.white, labelColor, icon]);

  return (
    <Touchable
      disabled={isLoading || disabled}
      style={getContainerStyle}
      onPress={onPress}>
      {icon && <Image style={styles.icon} source={icon} />}
      <Text
        fontType={fontType}
        style={getTextStyle}
        allowFontScaling={false}
        {...textProps}>
        {label}
      </Text>
      {isLoading && <ActivityIndicator color={indicatorColor} />}
    </Touchable>
  );
};

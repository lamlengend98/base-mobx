import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { FONT_TYPES } from './constants';

export type TextFiledProps = TextInputProps & {
  fontType?: keyof typeof FONT_TYPES;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
  labelContentStyle?: ViewStyle;
  renderLeftAccessory?: () => JSX.Element;
  renderRightAccessory?: () => JSX.Element;
  prefix?: string;
  suffix?: string;
  prefixStyle?: TextStyle;
  useFocus?: boolean;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

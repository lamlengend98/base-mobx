import { TextProps, TextStyle } from 'react-native';
import { DefaultTheme } from '@/theme';
import { FONT_TYPES } from '../text-field/constants';
import { BUTTON_STYLES } from './constants';

export type ButtonProps = {
  label: string;
  style?: TextStyle;
  buttonStyle?: keyof typeof BUTTON_STYLES;
  fontType?: keyof typeof FONT_TYPES;
  icon?: any;
  isLoading?: boolean;
  onPress?: () => any;
  isShadow?: boolean;
  disabled?: boolean;
  labelColor?: keyof typeof DefaultTheme.colors;
  indicatorColor?: keyof typeof DefaultTheme.colors;
  textProps?: TextProps;
};

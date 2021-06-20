import { TextStyle } from 'react-native';
import { DefaultTheme } from '@/theme';

export type RateProps = {
  numStar?: number;
  percent: number;
  style?: TextStyle;
  activeColor?: keyof typeof DefaultTheme.colors;
  inActiveColor?: keyof typeof DefaultTheme.colors;
  onPress?: (percent: number) => void;
};

import { ReactNode } from 'react';
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export type TouchableProps = TouchableOpacityProps & {
  children: ReactNode;
  underlayColor?: string;
  style?: StyleProp<ViewStyle>;
  handleSubmit?: () => void;
};

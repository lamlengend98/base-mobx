import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackNavigation<
  T extends ParamListBase = {},
  RouteName extends keyof T = string
> = StackNavigationProp<T, RouteName>;

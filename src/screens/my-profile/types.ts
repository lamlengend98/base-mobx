import { TextStyle } from 'react-native';

export interface Menu {
  id: number;
  label: string;
  style?: TextStyle;
  icon: any;
  screen: string;
  type?: string;
}

export interface MenuProps {
  item?: Menu;
  onPress?: (item: Menu) => void;
}

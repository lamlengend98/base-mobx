import { TextStyle } from 'react-native';
import { Icon65doctor } from '@/assets';

export type AppBarsProps = {
  title?: string;
  hasBack?: boolean;
  hasRightIcons?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  iconStyleLeft?: TextStyle;
  iconStyleRight?: TextStyle;
  iconPressLeft?: keyof typeof Icon65doctor.icons;
  iconPressRight?: keyof typeof Icon65doctor.icons;
  isShadowBottom?: boolean;
  textAlign?: 'auto' | 'center' | 'left' | 'right' | 'justify' | undefined;
  isShowDrawer?: boolean;
  colorIcon?: string;
  renderButtonRight?: () => JSX.Element;
  btnRightDisable?: boolean;
};

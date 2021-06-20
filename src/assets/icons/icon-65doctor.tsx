import { memo, MemoExoticComponent } from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { ICONS } from './constants';
const Icon65doctorBase = createIconSetFromIcoMoon(
  require('./selection.json'),
  'Icon65doctor',
  'Icon65doctor.ttf',
);

export const Icon65doctor = memo(Icon65doctorBase) as MemoExoticComponent<
  typeof Icon65doctorBase
> & {
  icons: typeof ICONS;
};

Icon65doctor.icons = ICONS;

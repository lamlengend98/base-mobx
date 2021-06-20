import { ReactNode } from 'react';
import { ParsedTextProps as ParsedTextPropsBase } from 'react-native-parsed-text';
import { FONT_TYPES } from './constants';

export type ParsedTextProps = ParsedTextPropsBase & {
  children: ReactNode;
  fontType?: keyof typeof FONT_TYPES;
  isViewHtml?: boolean;
  isLongText?: boolean;
  showMore?: boolean;
};

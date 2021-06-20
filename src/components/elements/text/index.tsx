import React, { useCallback, useMemo, useState } from 'react';
import HtmlView from 'react-native-htmlview';
import ParsedText from 'react-native-parsed-text';
import { useTheme } from '@/theme';
import { Touchable } from '../touchable';
import { FONT_TYPES } from './constants';
import { useStyleText } from './styles';
import { ParsedTextProps } from './types';

export const Text = ({
  children,
  style,
  fontType = 'REGULAR_SF',
  isViewHtml,
  isLongText,
  numberOfLines,
  showMore = true,
  ...other
}: ParsedTextProps) => {
  const { typography } = useTheme();
  const [isShowMore, setIsShowMore] = useState(false);
  const styles = useMemo(() => [typography[FONT_TYPES[fontType]], style], [
    style,
    fontType,
    typography,
  ]);
  const styleText = useStyleText();

  const onPressText = useCallback(() => {
    setIsShowMore(true);
  }, []);
  const onPressShowLess = useCallback(() => {
    setIsShowMore(false);
  }, []);

  if (isViewHtml) {
    return (
      <>
        <HtmlView
          value={`<div>${children}</div>`}
          stylesheet={{
            div: styles,
          }}
          nodeComponentProps={{
            numberOfLines: isShowMore ? undefined : numberOfLines,
            selectable: true,
            allowFontScaling: false,
          }}
        />
        {showMore && (
          <Touchable onPress={isShowMore ? onPressShowLess : onPressText}>
            <ParsedText allowFontScaling={false} style={styleText.showMore}>
              {isShowMore ? `show less` : `show more`}
            </ParsedText>
          </Touchable>
        )}
      </>
    );
  }

  if (isLongText) {
    return (
      <ParsedText
        allowFontScaling={false}
        onPress={onPressText}
        numberOfLines={isShowMore ? undefined : numberOfLines}
        style={styles}
        {...other}>
        {children}
      </ParsedText>
    );
  }

  return (
    <ParsedText allowFontScaling={false} style={styles} {...other}>
      {children}
    </ParsedText>
  );
};

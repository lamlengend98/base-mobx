import React, { memo } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform, useTheme } from '@/theme';

const Loader = () => {
  const { colors } = useTheme();
  const { deviceHeight, deviceWidth } = Platform;
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <ContentLoader
        width={deviceWidth - Platform.SizeScale(20)}
        height={deviceHeight / 6}
        viewBox={`0 0 ${deviceWidth - Platform.SizeScale(50)} ${
          deviceHeight / 6
        }`}
        backgroundColor={colors.gray}
        foregroundColor={colors.white}>
        <Rect x="0" y="8" rx="3" ry="3" width={deviceHeight / 8} height="6" />
        <Rect x="0" y="26" rx="3" ry="3" width={deviceHeight / 4} height="6" />
        <Rect x="0" y="56" rx="3" ry="3" width={deviceHeight / 10} height="6" />
        <Rect x="0" y="72" rx="3" ry="3" width={deviceHeight / 2} height="6" />
        <Rect
          x="0"
          y="88"
          rx="3"
          ry="3"
          width={deviceHeight / 2 - Platform.SizeScale(50)}
          height="6"
        />
      </ContentLoader>
    </ScrollView>
  );
};

export const HorizontalLoader = memo(Loader);

import React, { memo } from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform, useTheme } from '@/theme';

const HomeLoaderBase = () => {
  const { colors } = useTheme();
  const { deviceHeight, deviceWidth } = Platform;
  const categoryWidth = (deviceWidth - 18) / 4;
  const categoryTitleWidth = categoryWidth - 17;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <ContentLoader
        speed={1.5}
        width={deviceWidth}
        height={deviceHeight}
        viewBox={`0 0 ${deviceWidth} ${deviceHeight}`}
        backgroundColor={colors.gray}
        foregroundColor={colors.white}>
        <Rect rx="6" ry="6" x="8" y="55" width="142" height="40" />
        <Circle cx={deviceWidth - 46} cy="77" r="12" />
        <Circle cx={deviceWidth - 18} cy="77" r="12" />
        <Rect
          x="9"
          y="109"
          rx="6"
          ry="6"
          width={deviceWidth - 18}
          height="35"
        />
        {/* category */}
        <Rect x="9" y="163" rx="6" ry="6" width="60%" height="27" />
        {/* Item 1 */}
        <Rect x="9" y="199" rx="6" ry="6" width={categoryWidth} height="91" />
        <Rect
          x="17"
          y="296"
          rx="0"
          ry="0"
          width={categoryTitleWidth}
          height="15"
        />
        {/* Item 2 */}
        <Rect
          x={categoryWidth + 12}
          y="200"
          rx="0"
          ry="0"
          width={categoryWidth}
          height="91"
        />
        <Rect
          x={categoryWidth + 20}
          y="297"
          rx="0"
          ry="0"
          width={categoryTitleWidth}
          height="15"
        />
        {/* Item 3 */}
        <Rect
          x={categoryWidth * 2 + 16}
          y="200"
          rx="0"
          ry="0"
          width={categoryWidth}
          height="91"
        />
        <Rect
          x={categoryWidth * 2 + 26}
          y="296"
          rx="0"
          ry="0"
          width={categoryTitleWidth}
          height="15"
        />
        {/* Item 4 */}
        <Rect
          x={categoryWidth * 3 + 20}
          y="200"
          rx="0"
          ry="0"
          width={categoryWidth - 9}
          height="91"
        />
        <Rect
          x={categoryWidth * 3 + 23}
          y="296"
          rx="0"
          ry="0"
          width={categoryTitleWidth}
          height="15"
        />

        <Rect
          x="12"
          y="319"
          rx="0"
          ry="0"
          width={deviceWidth - 18}
          height="180"
        />
        <Rect x="13" y="512" rx="6" ry="6" width="152" height="26" />
        <Rect
          x={deviceWidth - 72}
          y="512"
          rx="6"
          ry="6"
          width="64"
          height="28"
        />
        <Rect
          x="13"
          y="548"
          rx="0"
          ry="0"
          width={deviceWidth - 18}
          height="122"
        />
        <Rect
          x="14"
          y="681"
          rx="0"
          ry="0"
          width={deviceWidth - 18}
          height="138"
        />
      </ContentLoader>
    </ScrollView>
  );
};

export const HomeLoader = memo(HomeLoaderBase);

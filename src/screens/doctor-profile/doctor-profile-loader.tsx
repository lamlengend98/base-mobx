import React, { Fragment, memo } from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

const DoctorProfileLoaderBase = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { deviceHeight, deviceWidth } = Platform;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: insets.top }}>
      <ContentLoader
        speed={1.5}
        width={deviceWidth}
        height={deviceHeight}
        viewBox={`0 0 ${deviceWidth} ${deviceHeight}`}
        backgroundColor={colors.gray}
        foregroundColor={colors.white}>
        <Rect rx="6" ry="6" x="9" y="25" width="142" height="40" />
        <Circle cx={deviceWidth - 46} cy="32" r="12" />
        <Circle cx={deviceWidth - 18} cy="32" r="12" />

        <Rect x="9" y="80" rx="8" ry="8" width={deviceWidth - 18} height="25" />
        <Rect
          x="13"
          y="112"
          rx="8"
          ry="8"
          width={deviceWidth / 3}
          height="25"
        />
        <Rect
          x={deviceWidth / 3 + 16}
          y="112"
          rx="8"
          ry="8"
          width={deviceWidth / 3 - 20}
          height="25"
        />
        <Rect
          x={(deviceWidth / 3) * 2}
          y="112"
          rx="8"
          ry="8"
          width={deviceWidth / 3 - 10}
          height="25"
        />

        {Array.from(Array(20)).map((_, index) => (
          <Fragment key={index.toString()}>
            <Rect
              x="9"
              y={74 * (index + 1) + 70}
              rx="8"
              ry="8"
              width="30%"
              height="14"
            />
            <Rect
              x="9"
              y={74 * (index + 1) + 89}
              rx="5"
              ry="5"
              width="55%"
              height="14"
            />
            <Rect
              x="9"
              y={74 * (index + 1) + 108}
              rx="8"
              ry="8"
              width="25%"
              height="14"
            />
            <Rect
              x="29%"
              y={74 * (index + 1) + 108}
              rx="8"
              ry="8"
              width="25%"
              height="14"
            />
            <Circle cx="14" cy={74 * (index + 1) + 130} r="5" />
            <Rect
              x="22"
              y={74 * (index + 1) + 127}
              rx="3"
              ry="3"
              width="50"
              height="7"
            />
            <Rect
              x={deviceWidth - 93}
              y={74 * (index + 1) + 70}
              rx="8"
              ry="8"
              width="80"
              height="68"
            />
          </Fragment>
        ))}
      </ContentLoader>
    </ScrollView>
  );
};

export const DoctorProfileLoader = memo(DoctorProfileLoaderBase);

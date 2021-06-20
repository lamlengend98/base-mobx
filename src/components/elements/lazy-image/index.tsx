import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TextStyle, View } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { textShift } from '@/utils';
import { Text } from '../text';
import { useStyleLazyImage } from './styles';

export const LazyImage = ({
  placeholder,
  source,
  stylePlaceholder,
  style,
  useLoading,
  ...other
}: {
  placeholder?: string;
  source: Source | undefined;
  stylePlaceholder?: TextStyle;
  useScale?: boolean;
  useLoading?: boolean;
} & FastImageProps) => {
  const { progressColor, styles } = useStyleLazyImage();
  const [isShowLoading, setShowLoading] = useState(true);

  const onLoadEnd = useCallback(() => {
    if (useLoading) {
      setShowLoading(false);
    }
  }, [useLoading]);

  if (source !== undefined && source !== null) {
    return (
      <View style={style}>
        <FastImage {...{ source, style, ...other, onLoadEnd }} />
        {useLoading && isShowLoading && (
          <ActivityIndicator
            style={[style, styles.indicator]}
            color={progressColor}
          />
        )}
      </View>
    );
  }
  return (
    <Text fontType="BOLD_SF" style={stylePlaceholder}>
      {textShift(placeholder)?.toUpperCase()}
    </Text>
  );
};

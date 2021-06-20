import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DefaultProfile } from '@/assets';
import { Rate } from '@/components/elements/rating';
import { useTheme } from '@/theme';
import { DoctorProfileProps } from '@/types/doctor-profile';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemDoctor } from './styles';

const _DoctorItem = ({
  item,
  onPress,
  isShowStatus = true,
  styleAvatar,
}: DoctorProfileProps) => {
  const styles = useStylesItemDoctor();
  const { formatMessage } = useIntl();
  const _onPress = useCallback(() => {
    return item && onPress && onPress?.(item);
  }, [onPress, item]);
  const { colors } = useTheme();

  const getRatingContent = useMemo(() => {
    return formatMessage(
      { id: 'home.reviews_counter' },
      {
        reviews: item?.rating.length || '',
      },
    );
  }, [item, formatMessage]);

  const renderStatus = useCallback(() => {
    return (
      <View style={styles.starContainer}>
        <View
          style={[
            styles.statusCheck,
            {
              backgroundColor: item?.is_online
                ? colors.moderateCyan
                : styles.statusCheck.backgroundColor,
            },
          ]}
        />
        <Text fontType="REGULAR_SF" style={styles.statusText}>
          {item?.is_online
            ? ` ${formatMessage({ id: 'app.online' })}`
            : ` ${formatMessage({ id: 'app.offline' })}`}
        </Text>
      </View>
    );
  }, [
    formatMessage,
    colors.moderateCyan,
    item?.is_online,
    styles.starContainer,
    styles.statusCheck,
    styles.statusText,
  ]);

  return (
    <Touchable style={styles.container} onPress={_onPress}>
      <View style={styles.detailsContainer}>
        <Text fontType={'BOLD_SF'} style={styles.name} numberOfLines={1}>
          {item?.name}
        </Text>
        <Text isViewHtml showMore={false} style={styles.description}>
          {item?.details}
        </Text>
        <Text isViewHtml style={styles.description} numberOfLines={2}>
          {item?.address}
        </Text>
        <View style={styles.starContainer}>
          <Rate
            activeColor={'lightGreen'}
            percent={item?.rating_avg ? Number(item?.rating_avg) : 0}
          />
          <Text style={styles.review} numberOfLines={1}>
            {getRatingContent}
          </Text>
        </View>
        {isShowStatus && renderStatus()}
      </View>
      <FastImage
        source={item?.avatar ? { uri: item?.avatar } : DefaultProfile}
        resizeMode="cover"
        style={[styles.avatar, styleAvatar]}
      />
    </Touchable>
  );
};

export const DoctorItem = React.memo(_DoctorItem);

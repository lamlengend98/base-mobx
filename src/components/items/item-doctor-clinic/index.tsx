import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DefaultProfile, Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Rate } from '@/components/elements';
import { getDisplayedAvatar } from '@/utils';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemDoctor } from './styles';
import { DoctorClinicProps } from './type';

const _DoctorClinicItem = ({
  item,
  onItemPress,
  onVideoCallPress,
  onChatPress,
}: DoctorClinicProps) => {
  const styles = useStylesItemDoctor();
  const { formatMessage } = useIntl();

  const _onItemPress = useCallback(() => {
    return item && onItemPress?.(item);
  }, [onItemPress, item]);

  const _onVideoCallPress = useCallback(() => {
    return item && onVideoCallPress?.(item);
  }, [onVideoCallPress, item]);

  const _onChatPress = useCallback(() => {
    return item && onChatPress?.(item);
  }, [onChatPress, item]);

  const doctorAvatar = useMemo(() => {
    const avatar = item?.photo
      ? getDisplayedAvatar(item?.photo)
      : DefaultProfile;
    return avatar;
  }, [item?.photo]);

  return (
    <Touchable style={styles.container} onPress={_onItemPress}>
      <FastImage
        source={doctorAvatar}
        resizeMode="cover"
        style={styles.avatar}
      />
      <View style={styles.detailsContainer}>
        <Text fontType={'BOLD_SF'} style={styles.name} numberOfLines={2}>
          {item?.name}
        </Text>
        <Text fontType={'BOLD_SF'} numberOfLines={2}>
          {item?.specialty?.toUpperCase()}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {formatMessage(
            { id: 'clinic.exp' },
            { exp: item?.year_experience || '0' },
          )}
        </Text>
        <View style={styles.actions}>
          <Touchable style={styles.iconContainer} onPress={_onVideoCallPress}>
            <Icon65doctor name={ICONS.VIDEO_CALL} style={styles.iconCall} />
          </Touchable>
          <Touchable style={styles.iconContainer} onPress={_onChatPress}>
            <Icon65doctor name={ICONS.MESSAGE} style={styles.iconMsg} />
          </Touchable>
        </View>
      </View>

      <View>
        <Rate
          percent={item?.rating_avg || 0}
          style={styles.rating}
          activeColor={'lightGreen'}
        />
        <Text fontType={'BOLD_RB'} style={styles.reviewText}>
          {item?.rating_avg} out of 5
        </Text>
      </View>
    </Touchable>
  );
};

export const DoctorClinicItem = React.memo(_DoctorClinicItem);

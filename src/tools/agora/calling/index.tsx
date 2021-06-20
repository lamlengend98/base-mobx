import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DefaultProfile } from '@/assets';
import { Button, Text } from '@/components';
import { useStyleCalling } from './styles';
import { CallingProps, CallingStatus } from './types';

export const Calling = ({
  status,
  onPressStopPhone,
  doctor,
  onCallback,
}: CallingProps) => {
  const styles = useStyleCalling();
  const { formatMessage } = useIntl();

  switch (CallingStatus[status]) {
    case CallingStatus.CALLING:
      return (
        <View style={styles.container}>
          <Text fontType="MEDIUM_SF" style={styles.title}>
            {formatMessage({ id: 'tools.agora.calling.title' })}
          </Text>
          <View style={styles.circle1}>
            <View style={styles.circle2}>
              <View style={styles.circle3}>
                <FastImage
                  source={{ uri: doctor?.picture } || DefaultProfile}
                  resizeMode="center"
                  style={styles.avatar}
                />
              </View>
            </View>
          </View>
          <Text fontType="BOLD_SF" style={styles.name}>
            {doctor?.name}
          </Text>
          <Text fontType="REGULAR_SF" style={styles.connecting}>
            Connecting...
          </Text>
        </View>
      );
    case CallingStatus.HANG_ON:
      return (
        <View style={styles.hangOnContainer}>
          <Text fontType="MEDIUM_SF" style={styles.hangOnTitle}>
            {formatMessage({ id: 'tools.agora.calling.busy' })}
          </Text>
          <View style={styles.btnHangOnGroup}>
            <Button
              buttonStyle="BLUE"
              isShadow
              label={formatMessage({ id: 'tools.agora.hang.on' })}
              style={styles.btnHangOn}
              onPress={onCallback}
            />
            <Button
              buttonStyle="RED"
              isShadow
              style={styles.btnHangOn}
              label={formatMessage({ id: 'tools.agora.end.call' })}
              onPress={onPressStopPhone}
            />
          </View>
        </View>
      );
    case CallingStatus.BUSY_LINE:
      return (
        <View style={styles.hangOnContainer}>
          <Text fontType="MEDIUM_SF" style={styles.hangOnTitle}>
            {formatMessage({ id: 'tools.agora.calling.busy' })}
          </Text>
          <View style={styles.btnHangOnGroup}>
            <Button
              buttonStyle="GREEN"
              isShadow
              labelColor="white"
              label={formatMessage({ id: 'tools.agora.call.back' })}
              style={styles.btnHangOn}
              onPress={onCallback}
            />
            <Button
              buttonStyle="RED"
              isShadow
              style={styles.btnHangOn}
              label={formatMessage({ id: 'tools.agora.end.call' })}
              onPress={onPressStopPhone}
            />
          </View>
        </View>
      );
    default:
      return <></>;
  }
};

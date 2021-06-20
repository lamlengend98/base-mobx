import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon65doctor } from '@/assets';
import { Text } from '@/components/elements';
import { COLORS, Platform, useTheme } from '@/theme';

const TopBar = ({ setIsVisible }) => {
  const { formatMessage } = useIntl();
  const { colors } = useTheme();
  const onPress = useCallback(() => setIsVisible(false), [setIsVisible]);
  return (
    <View style={styles.container}>
      <TouchableOpacity {...{ onPress }} style={styles.imgContainer}>
        <Icon65doctor
          name={Icon65doctor.icons.ARROW_LEFT}
          style={{
            fontSize: Platform.SizeScale(20),
            color: colors.darkGray,
          }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          {formatMessage({ id: 'confirm.add.payment' })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Platform.SizeScale(15),
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.DARK_GRAY,
  },
  imgContainer: { width: '10%' },
  textStyle: {
    fontSize: Platform.SizeScale(20),
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
    textAlign: 'left',
  },
  textContainer: { width: '60%' },
});

export default TopBar;

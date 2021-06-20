import React, { memo } from 'react';
import { View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { useStylesSwitch } from './styles';
import { SwitchProps } from './types';

function SwitchBase({ label, isOn, style, onToggle }: SwitchProps) {
  const styles = useStylesSwitch();
  return (
    <View style={style}>
      <ToggleSwitch
        isOn={isOn}
        onColor={styles.active.color}
        offColor={styles.inActive.color}
        label={label}
        labelStyle={styles.label}
        size="small"
        onToggle={onToggle}
      />
    </View>
  );
}

export const Switch = memo(SwitchBase);

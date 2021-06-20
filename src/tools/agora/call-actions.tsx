import React, { memo, useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { Icon65doctor } from '@/assets';
import { Touchable } from '@/components';
import { useAppStore } from '@/hooks';
import { useTheme } from '@/theme';
import { CallingStatus } from './calling/types';
import { useStyleAgora } from './styles';
import { CallActionsProps } from './types';

let timeoutAlert;
let timeoutStopPhone;
const CallActionsBase = ({
  onPressBluetooth,
  onPressStopPhone,
  joinSucceed,
  callStatus,
  hasTimeoutCall,
}: CallActionsProps) => {
  const styles = useStyleAgora();
  const [isShowMoreAction, setShowMoreAction] = useState(true);
  const [isEndCall, setIsEndCall] = useState(false);
  const { colors } = useTheme();
  const { formatMessage } = useIntl();
  const dropDownAlertRef: any = useRef();
  const { doctor } = useAppStore();

  const handleShowMoreAction = useCallback(() => {
    setShowMoreAction(!isShowMoreAction);
  }, [isShowMoreAction]);

  const handleStopPhone = useCallback(() => {
    timeoutAlert && clearTimeout(timeoutAlert);
    timeoutStopPhone && clearTimeout(timeoutStopPhone);
    timeoutAlert = undefined;
    timeoutStopPhone = undefined;
    onPressStopPhone();
    setIsEndCall(true);
  }, [onPressStopPhone]);

  const isShowMore = !joinSucceed && isShowMoreAction;
  if (
    callStatus === CallingStatus.BUSY_LINE ||
    callStatus === CallingStatus.HANG_ON
  ) {
    return <></>;
  }

  if (hasTimeoutCall && callStatus === CallingStatus.IN_THE_CALL) {
    timeoutAlert = setTimeout(
      () => {
        dropDownAlertRef.current?.alertWithType(
          'warn',
          'Warning',
          formatMessage({ id: 'app.call.warningtime' }, { second: 10 }),
          {},
          10000,
        );
        timeoutStopPhone = setTimeout(() => {
          handleStopPhone();
        }, 10000);
      },
      doctor?.statusDoctor
        ? doctor?.statusDoctor?.callTime?.value * 60 * 1000
        : 0,
    );
  }
  return (
    <View style={styles.actions}>
      {/* <Touchable onPress={handleShowMoreAction}>
        <Icon65doctor
          style={[
            styles.actionIcon,
            !isShowMore && { width: Platform.SizeScale(35) },
          ]}
          name={Icon65doctor.icons[isShowMore ? 'ARROW_RIGHT' : 'ARROW_LEFT']}
        />
      </Touchable> */}
      <DropdownAlert
        containerStyle={styles.dropdown}
        ref={dropDownAlertRef}
        showCancel={false}
        titleNumOfLines={2}
        messageNumOfLines={0}
      />
      {/* {isShowMore && (
        <>
          <Touchable onPress={onPressBluetooth}>
            <Icon65doctor
              style={styles.actionIcon}
              name={Icon65doctor.icons.BLUETOOTH}
            />
          </Touchable>
          <Touchable onPress={onPressPause}>
            <Icon65doctor
              style={styles.actionIcon}
              name={Icon65doctor.icons.PHONE_PAUSE}
            />
          </Touchable>
          <Touchable onPress={onPressMic}>
            <Icon65doctor
              style={styles.actionIcon}
              name={Icon65doctor.icons.MIC}
            />
          </Touchable>
          <Touchable onPress={onPressSound}>
            <Icon65doctor
              style={styles.actionIcon}
              name={Icon65doctor.icons.SOUND}
            />
          </Touchable>
        </>
      )} */}
      <Touchable
        disabled={isEndCall}
        onPress={handleStopPhone}
        style={[
          styles.actionPhone,
          {
            backgroundColor: isEndCall
              ? colors.darkGray
              : styles.actionPhone.backgroundColor,
          },
        ]}>
        <Icon65doctor
          style={styles.actionPhoneIcon}
          name={Icon65doctor.icons.PHONE}
        />
      </Touchable>
    </View>
  );
};

export const CallActions = memo(CallActionsBase);

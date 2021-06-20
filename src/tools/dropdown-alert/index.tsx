import React, { useCallback, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import DropdownAlert from 'react-native-dropdownalert';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { Observer } from 'mobx-react-lite';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { DropdownAlertContext } from './context';
import { useStyleDropdownAlert } from './styles';
import {
  DropdownAlertContextValue,
  DropdownAlertContextValueProps,
} from './types';

export const DropdownAlertProvider = ({
  children,
}: DropdownAlertContextValue) => {
  const dropDownAlertRef: any = useRef<DropdownAlert>();
  const styles = useStyleDropdownAlert();
  const { formatMessage } = useIntl();
  const getContent = useCallback(
    (mes: CometChat.TextMessage | CometChat.MediaMessage | any) => {
      if (mes?.getType() === CometChat.MESSAGE_TYPE.TEXT) {
        return mes?.getText();
      } else if (mes?.getType() === CometChat.MESSAGE_TYPE.AUDIO) {
        return `${formatMessage({ id: 'app.chat.received_audio' })}`;
      } else if (mes?.getType() === CometChat.MESSAGE_TYPE.IMAGE) {
        return `${formatMessage({ id: 'app.chat.received_image' })}`;
      } else if (mes?.getType() === CometChat.MESSAGE_TYPE.VIDEO) {
        return `${formatMessage({ id: 'app.chat.send_image_video' })}`;
      } else if (mes?.getType() === CometChat.MESSAGE_TYPE.CUSTOM) {
        return `${formatMessage({ id: 'app.chat.end' })}`;
      } else {
        return '';
      }
    },
    [formatMessage],
  );

  const handleShowAlert = useCallback(
    (message: CometChat.BaseMessage) => {
      console.log(
        `🛠 LOG: 🚀 --> -------------------------------------------------------------------------------`,
      );
      console.log(
        `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 16 ~ handleShowAlert ~ message`,
        message,
        message?.getSender()?.getAvatar(),
      );
      console.log(
        `🛠 LOG: 🚀 --> -------------------------------------------------------------------------------`,
      );
      dropDownAlertRef.current?.alertWithType(
        'custom',
        `#${message.getSender().getName()}`,
        getContent(message),
        {
          message,
          source: message?.getSender()?.getAvatar(),
        },
      );
    },
    [getContent],
  );

  const handleShowAlertWarning = useCallback(
    (message: string, time: number) => {
      dropDownAlertRef.current?.alertWithType(
        'warn',
        'Warning',
        message,
        {},
        time,
      );
    },
    [],
  );

  const handleCloseAlert = useCallback(() => {}, []);

  const onTap = useCallback((data: any) => {
    if (!Object.keys(data.payload)) {
      return;
    }

    const { message }: { message: CometChat.BaseMessage } = data.payload;
    NavigationService.navigate(ROUTES.CHATTING, {
      doctorId: message.getSender().getUid(),
      doctor: message.getSender(),
      hasSend: false,
    });
  }, []);
  const contextValue = useMemo<DropdownAlertContextValueProps>(
    () => ({
      close: handleCloseAlert,
      show: handleShowAlert,
      showWarning: handleShowAlertWarning,
    }),
    [handleCloseAlert, handleShowAlert, handleShowAlertWarning],
  );

  return (
    <>
      <DropdownAlertContext.Provider value={contextValue}>
        {children}
      </DropdownAlertContext.Provider>
      <Observer>
        {() => {
          return (
            <>
              <DropdownAlert
                containerStyle={styles.patient}
                ref={dropDownAlertRef}
                showCancel={false}
                onTap={onTap}
                titleNumOfLines={2}
                messageNumOfLines={0}
              />
            </>
          );
        }}
      </Observer>
    </>
  );
};

DropdownAlertContext.displayName = 'DropdownAlertContext';

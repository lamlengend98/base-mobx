import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import RNNetInfo from '@react-native-community/netinfo';
import RNVoipCall, { RNVoipPushKit } from 'hisoft-react-native-voip-call';
import { observer } from 'mobx-react';
import { useLocalStore } from 'mobx-react-lite';
import { useAgora, usePermissions } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { Platform } from '@/theme';
import {
  displayIncommingCall,
  IsIos,
  stopNotificationCallAndroid,
} from '@/utils';
import { TYPE_CALL } from '../agora/types';
import { NetworkProvider } from './network-provider';
import { NetInfo, TYPE_CALL_DEVICE } from './types';

export const NetworkInfo = observer(({ children }: { children: ReactNode }) => {
  const storeLocal = useLocalStore<NetInfo>(() => ({}));
  const agra = useAgora();
  const [appStatus, setAppStatus] = useState(AppState.currentState);
  const permissions = usePermissions();

  const idsOneSignal = useCallback(
    (info) => {
      console.log('====================================');
      console.log('ids', info);
      console.log('====================================');
      storeLocal.ids = info;
    },
    [storeLocal],
  );

  const openedOneSignal = useCallback(
    ({ channelName, token, uid, uuid, sender }, timeoutCall?: boolean) => {
      permissions.requestVideoCallPermission(() => {
        agra.startCall({
          infoJoin: {
            channelName,
            token,
            optionalUid: Number(uid),
            optionalInfo: sender.id,
            uuid,
            sender,
          },
          type: TYPE_CALL.VIDEO,
          timeoutCall,
        });
      });
    },
    [agra, permissions],
  );

  const openNotification = useCallback((props) => {
    const {
      notification: {
        payload: {
          additionalData: { token, channelName, sender, type, uid, call },
        },
      },
    } = props;
    console.log(
      `🛠 LOG: 🚀 --> -------------------------------------------------------------------------`,
    );
    console.log(
      `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 39 ~ NetworkInfo ~ type`,
      type,
      sender,
    );
    console.log(
      `🛠 LOG: 🚀 --> -------------------------------------------------------------------------`,
    );
    try {
      switch (type) {
        case TYPE_CALL_DEVICE.NOTIFICATION: // notification thong thuong
          // TODO:

          break;
        case TYPE_CALL_DEVICE.CHAT: // notification chat
          // TODO:
          NavigationService.navigate(ROUTES.CHATTING, {
            doctorId: sender.id,
            doctor: sender,
            hasSend: false,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, []);

  const handleReceiveCall = useCallback(
    (
      i,
      { type, channelName, sender, token, uid, call },
      isDisplayIncommingCall = true,
    ) => {
      agra.changeStopCall(call);
      // nếu type là start call
      if (type === TYPE_CALL_DEVICE.START_CALL) {
        storeLocal.infoCall = {
          channelName,
          token,
          uid,
          uuid: i,
          sender,
        };
        agra.changeInfoCall({
          channelName,
          token,
          uuid: i,
          sender,
        });
        if (appStatus !== 'active') return;
        isDisplayIncommingCall && displayIncommingCall(sender, channelName, i);
      } else {
        // nếu type là stop call
        agra.changeIsVisible(false);
        agra.endCall();
      }
    },
    [agra, appStatus, storeLocal],
  );

  // nhận thông báo binh thường và call android
  const recivedOneSignal = useCallback(
    (msg: any) => {
      console.log('vedOneSignal', msg);
      const {
        androidNotificationId,
        payload: {
          additionalData: { token, channelName, sender, type, uid, call },
          notificationID,
        },
      } = msg;
      try {
        switch (type) {
          case TYPE_CALL_DEVICE.NOTIFICATION: // notification thong thuong
            // TODO:
            break;
          default:
            handleReceiveCall(androidNotificationId, {
              type,
              channelName,
              sender,
              token,
              uid,
              call,
            });
            break;
        }
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    },
    [handleReceiveCall],
  );

  const receiveVoipNotification = useCallback(
    ({
      custom: {
        i,
        a: { type, channelName, sender, token, uid, call },
      },
    }: any) => {
      handleReceiveCall(i, { type, channelName, sender, token, uid, call });
    },
    [handleReceiveCall],
  );

  const iosPushKit = useCallback(() => {
    if (IsIos) {
      //For Push Kit
      RNVoipPushKit.requestPermissions(); // --- optional, you can use another library to request permissions
      //Ios PushKit device token Listner
      RNVoipPushKit.getPushKitDeviceToken((res) => {
        if (res.platform === 'ios') {
          console.log('====================================');
          console.log('res', res);
          console.log('====================================');
          storeLocal.voip = { token: res.deviceToken };
        }
      });
      //On Remote Push notification Recived in Forground
      RNVoipPushKit.RemotePushKitNotificationReceived(receiveVoipNotification);
    }
  }, [receiveVoipNotification, storeLocal]);

  const callKit = useCallback(() => {
    const options = {
      appName: 'RNVoip App', // Required
      imageName: 'logo', //string (optional) in ios Resource Folder
      ringtoneSound: '', //string (optional) If provided, it will be played when incoming calls received
      includesCallsInRecents: false, // boolean (optional) If provided, calls will be shown in the recent calls
      supportsVideo: true, //boolean (optional) If provided, whether or not the application supports video calling (Default: true)
    };
    // Initlize Call Kit IOS is Required
    RNVoipCall.initializeCall(options)
      .then(() => {
        //Success Call Back
      })
      .catch((e) => console.log(e));
  }, []);

  const iOSPromptCallback = useCallback((permission: any) => {
    console.log('iOSPromptCallback', permission);
  }, []);

  const handleAppStateChange = useCallback((status: AppStateStatus) => {
    setAppStatus(status);
  }, []);

  const rnVoipCallListners = useCallback(async () => {
    RNVoipCall.onCallAnswer((data) => {
      !IsIos && stopNotificationCallAndroid(data);
      openedOneSignal({ ...storeLocal?.infoCall! }, false);
    });

    !IsIos && RNVoipCall.onEndCall(stopNotificationCallAndroid);

    // on click call Notification
    RNVoipCall.onCallNotificationOpen(() => {
      openedOneSignal({ ...storeLocal?.infoCall! }, false);
    });

    RNVoipCall.getInitialNotificationActions()
      .then((data) => {
        console.log('====================================');
        console.log('data', data);
        console.log('====================================');
        stopNotificationCallAndroid(data);
        setTimeout(() => {
          openedOneSignal({ ...storeLocal?.infoCall! });
        }, 2000);
      })
      .catch((e) => console.log(e));
  }, [openedOneSignal, storeLocal]);

  useEffect(() => {
    const unsubscribe = RNNetInfo.addEventListener((state) => {
      storeLocal.netInfoState = state;
    });

    return () => unsubscribe();
  }, [storeLocal]);

  useEffect(() => {
    iosPushKit();
    callKit();
    rnVoipCallListners();
  }, [callKit, iosPushKit, rnVoipCallListners]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (__DEV__) {
      OneSignal.setLogLevel(6, 0);
    }
    OneSignal.init(Config.ONESIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    if (Platform.OS === 'ios') {
      // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
      OneSignal.promptForPushNotificationsWithUserResponse(iOSPromptCallback);
    }
    // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    OneSignal.inFocusDisplaying(__DEV__ ? 2 : 0);
    OneSignal.addEventListener('ids', idsOneSignal);
    OneSignal.addEventListener('opened', openNotification);
    OneSignal.addEventListener('received', recivedOneSignal);

    return () => {
      OneSignal.removeEventListener('ids', idsOneSignal);
      OneSignal.removeEventListener('opened', openNotification);
      OneSignal.removeEventListener('received', recivedOneSignal);
    };
  }, [iOSPromptCallback, idsOneSignal, openNotification, recivedOneSignal]);

  const getCallfromStore = useCallback(async () => {
    const storedVoip = await AsyncStorage.getItem(
      'storedVoip',
      async (error) => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        if (!error) {
          await AsyncStorage.removeItem('storedVoip');
        }
      },
    );
    console.log('====================================');
    console.log('storedVoip ', storedVoip, JSON.parse(storedVoip!));
    console.log('====================================');
    if (storedVoip) {
      const mess = JSON.parse(storedVoip);
      const {
        custom: {
          a: { type, channelName, sender, token, uid, call },
          i,
        },
      } = mess;
      handleReceiveCall(
        Number(uid),
        {
          type,
          channelName,
          sender,
          token,
          uid,
          call,
        },
        false,
      );
    }
  }, [handleReceiveCall]);

  useEffect(() => {
    !IsIos && getCallfromStore();
  }, [getCallfromStore]);

  return <NetworkProvider value={storeLocal}>{children}</NetworkProvider>;
});

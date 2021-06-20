import React, { useCallback, useEffect, useMemo } from 'react';
import { Image, ScrollView, View } from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import RNVoipCall from 'hisoft-react-native-voip-call';
import { observer } from 'mobx-react';
import { Observer, useLocalStore, useObserver } from 'mobx-react-lite';
import { useAppStore } from '@/hooks';
import { UpdateStatusCall } from '@/models/types';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { CallActions } from './call-actions';
import { Calling } from './calling';
import { CallingStatus } from './calling/types';
import { AgoraContext } from './context';
import { useStyleAgora } from './styles';
import {
  AgoraLocalStore,
  AgoraProviderProps,
  CallInfo,
  DataCall,
  TYPE_CALL,
} from './types';

let timeout;
export const AgoraProvider = observer(({ children }: AgoraProviderProps) => {
  const styles = useStyleAgora();
  const appStore = useAppStore();

  const store = useLocalStore<AgoraLocalStore>(() => ({
    isVisible: false,
    joinSucceed: false,
    peerIds: [],
    callStatus: CallingStatus.CALLING,
    doctor: undefined,
    isLoading: false,
    hasTimeoutCall: false,
  }));

  const joinChannelSuccess = useCallback(
    (channel, uid, elapsed) => {
      store.channelName = channel;
      console.log('joinChannelSuccess', { channel, uid, elapsed });
    },
    [store],
  );

  const changeCallStatus = useCallback(
    (status: CallingStatus) => {
      store.callStatus = status;
      clearTimeout(timeout!);
    },
    [store],
  );

  const endCall = useCallback(async () => {
    store.isVisible = false;
    await store.engine?.leaveChannel();
    store.channelName = '';
    store.joinSucceed = false;
    store.peerIds = [];
    store.infoCall?.uuid && RNVoipCall.endAllCalls();
    RNVoipCall.stopRingtune();
    store.infoCall = undefined;
    changeCallStatus(CallingStatus.CALLING);
  }, [changeCallStatus, store]);

  //TODO: dừng cuộc gọi thì call lên agora và server
  const onPressStopPhone = useCallback(
    async (isRate = true) => {
      const { doctor } = appStore;
      store.isLoading = true;

      try {
        const stopCall = await doctor.stopCallDoctor(
          store.infoCall?.token!,
          store.infoCall?.channelName!,
        );
        store.stopCall = stopCall;
        await endCall();
        isRate &&
          NavigationService.navigate(ROUTES.POST_CONSULTATION, {
            call: store.stopCall!,
            doctor: store.doctor,
          });
      } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
      } finally {
        store.isLoading = false;
      }
    },
    [appStore, endCall, store],
  );

  const userJoined = useCallback(
    (uid, elapsed) => {
      console.log(
        'userJoined',
        { uid, elapsed },
        appStore.doctor.doctorsInfoDetail,
      );
      store.joinSucceed = true;
      changeCallStatus(CallingStatus.IN_THE_CALL);
      if (!store.peerIds.includes(uid)) {
        store.peerIds = [...store.peerIds, uid];
      }
    },
    [appStore.doctor.doctorsInfoDetail, changeCallStatus, store],
  );

  const warning = useCallback((w) => {
    console.log('Waring', w);
  }, []);

  const error = useCallback((E) => {
    console.log('Error', E);
  }, []);

  const setTimeoutCall = useCallback(() => {
    timeout = setTimeout(() => {
      store.joinSucceed = true;
      store.callStatus = CallingStatus.BUSY_LINE;
    }, 30000);
  }, [store]);

  const changeIsJoinSucceed = useCallback(
    (bool: boolean) => {
      store.joinSucceed = bool;
    },
    [store],
  );

  const changeIsVisible = useCallback(
    (bool: boolean) => {
      store.isVisible = bool;
      timeout && clearTimeout(timeout);
    },
    [store],
  );

  const getDoctorDetail = useCallback(
    async (id: number) => {
      store.doctor = await appStore.doctor.getDoctorDetail(id);
      console.log(
        `🛠 LOG: 🚀 --> ------------------------------------------------------------------------`,
      );
      console.log(
        `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 110 ~ store.doctor`,
        store.doctor,
      );
      console.log(
        `🛠 LOG: 🚀 --> ------------------------------------------------------------------------`,
      );
    },
    [appStore.doctor, store],
  );

  const startCall = useCallback(
    async ({
      type,
      infoJoin: { channelName, optionalInfo, optionalUid = 0, token },
      timeoutCall = true,
    }: DataCall) => {
      store.isVisible = true;
      store.hasTimeoutCall = timeoutCall;
      optionalUid && getDoctorDetail(+optionalInfo!);
      timeoutCall && setTimeoutCall();
      if (type === TYPE_CALL.VIDEO) {
        await store.engine?.enableVideo().then(() => {});
      } else {
        await store.engine?.enableAudio().then(() => {});
      }
      await store.engine?.joinChannel(
        token,
        channelName,
        optionalInfo,
        optionalUid,
      );
      appStore.doctor?.updateCallStatus?.(
        UpdateStatusCall.PATIENT_JOINED,
        token!,
      );
      store.infoCall = {
        ...store.infoCall,
        token,
        channelName,
        optionalInfo,
        optionalUid,
      };
    },
    [appStore.doctor, getDoctorDetail, setTimeoutCall, store],
  );

  const userOffline = useCallback(
    (uid, reason) => {
      console.log('userOffline', { uid, reason });
      if (store.peerIds.includes(uid)) {
        store.peerIds = store.peerIds.filter((id) => id !== uid);
        endCall?.();
      }
    },
    [endCall, store],
  );

  const changeInfoCall = useCallback(
    (infoCall: AgoraLocalStore['infoCall']) => {
      store.infoCall = infoCall;
    },
    [store],
  );

  const changeStopCall = useCallback(
    (stopCall: CallInfo) => {
      store.stopCall = stopCall;
    },
    [store],
  );

  const value = useMemo(
    () => ({
      startCall,
      endCall,
      changeIsJoinSucceed,
      changeCallStatus,
      changeInfoCall,
      changeIsVisible,
      changeStopCall,
    }),
    [
      startCall,
      endCall,
      changeIsJoinSucceed,
      changeCallStatus,
      changeInfoCall,
      changeIsVisible,
      changeStopCall,
    ],
  );

  const onPressBluetooth = useCallback(() => {}, []);
  const onPressPause = useCallback(() => {}, []);
  const onPressMic = useCallback(() => {}, []);
  const onPressSound = useCallback(() => {}, []);
  const onCallback = useCallback(async () => {
    console.log(store.infoCall);
    const doctorId = store.infoCall?.optionalInfo;
    store.isLoading = true;
    await onPressStopPhone(false);
    doctorId &&
      appStore.doctor
        .callDoctor(+doctorId)
        .then(({ channelName, token, uid, paymentOption }) => {
          startCall({
            infoJoin: {
              channelName,
              token,
              optionalUid: +uid,
              optionalInfo: paymentOption?.doctorId,
            },
            type: TYPE_CALL.VIDEO,
          });
        })
        .catch((msg) => {})
        .finally(() => {
          store.isLoading = false;
        });
  }, [appStore.doctor, onPressStopPhone, startCall, store]);

  useEffect(() => {
    if (!store?.engine) {
      RtcEngine.create(Config.AGORA_APP_ID).then((val) => {
        store.engine = val;
        store.engine?.addListener('JoinChannelSuccess', joinChannelSuccess);
        store.engine?.addListener('UserJoined', userJoined);
        store.engine?.addListener('UserOffline', userOffline);
        store.engine?.addListener('Warning', warning);
        store.engine?.addListener('Error', error);
      });
    }
    return () => {};
  }, [error, joinChannelSuccess, store, userJoined, userOffline, warning]);

  const RTCView = useObserver(() => {
    const { channelName, peerIds, joinSucceed, callStatus: status } = store;

    return (
      <View style={styles.content}>
        {joinSucceed && (
          <>
            <View style={styles.header}>
              <FastImage
                source={{ uri: store.doctor?.picture }}
                resizeMode="contain"
                style={styles.iAvixo}
              />
            </View>
            <RtcLocalView.SurfaceView
              channelId={channelName}
              style={styles.max}
              renderMode={VideoRenderMode.FILL}
            />
            <ScrollView style={styles.remoteContainer} horizontal>
              {peerIds.map((val) => (
                <RtcRemoteView.SurfaceView
                  style={styles.remote}
                  uid={val}
                  key={val.toString()}
                  channelId={channelName}
                  renderMode={VideoRenderMode.Hidden}
                  zOrderMediaOverlay
                />
              ))}
            </ScrollView>
          </>
        )}
        <Calling
          {...{ status, onPressStopPhone, changeCallStatus, onCallback }}
          doctor={store.doctor}
        />
      </View>
    );
  });

  return (
    <AgoraContext.Provider {...{ value }}>
      {children}
      <Observer>
        {() => {
          const { isVisible, joinSucceed, isLoading, hasTimeoutCall } = store;
          if (!isVisible) {
            return <></>;
          }

          return (
            <Modal isVisible useNativeDriver style={styles.container}>
              {RTCView}
              <CallActions
                {...{
                  onPressBluetooth,
                  onPressMic,
                  onPressPause,
                  onPressSound,
                  joinSucceed,
                  onPressStopPhone,
                  hasTimeoutCall,
                }}
                callStatus={store.callStatus}
              />
              <Spinner visible={isLoading} />
            </Modal>
          );
        }}
      </Observer>
    </AgoraContext.Provider>
  );
});

import React, { useCallback, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform, View } from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import { Text } from '@/components';
import { useAppStore } from '@/hooks';
import Button from './button';
import { MediaTransferContext } from './context';
import { ratio, screenWidth, useStyleMediaTrans } from './styles';
import { MediaTransferContextValue, MediaTransferProviderProps } from './types';

export const MediaTransferProvider = observer(
  ({ children }: MediaTransferProviderProps) => {
    const audioRecorderPlayer: AudioRecorderPlayer = useMemo(
      () => new AudioRecorderPlayer(),
      [],
    );

    const [state, setState] = useState({
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    });
    const styles = useStyleMediaTrans();
    const playWidth = useMemo(() => {
      const res =
        (state.currentPositionSec / state.currentDurationSec) *
        (screenWidth - 56 * ratio);
      return res ? res : 0;
    }, [state.currentDurationSec, state.currentPositionSec]);
    const { chat } = useAppStore();

    const grantPermission = useCallback(async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    }, []);

    useEffect(() => {
      audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }, [audioRecorderPlayer]);

    useEffect(() => {
      grantPermission();
    }, [grantPermission]);

    const onStartRecord = useCallback(async () => {
      const path = Platform.select({
        ios: 'hello.m4a',
        android: 'sdcard/hello.mp4',
      });
      const audioSet: AudioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      console.log('audioSet', audioSet);
      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
      audioRecorderPlayer.addRecordBackListener((e: any) => {
        const recordSecs = e.current_position;
        const recordTime = audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        );
        setState({
          ...state,
          recordSecs,
          recordTime,
        });
        chat.setRecordSecs(recordSecs);
        chat.setRecordTime(recordTime);
      });
      console.log(`uri: ${uri}`);
      return uri;
    }, [audioRecorderPlayer, chat, state]);

    const onStartPlay = useCallback(
      async (uri?: string) => {
        console.log('onStartPlay');
        const path = Platform.select({
          ios: 'hello.m4a',
          android: 'sdcard/hello.mp4',
        });
        const msg = await audioRecorderPlayer.startPlayer(uri || path);
        audioRecorderPlayer.setVolume(1.0);
        console.log('msg', msg);
        audioRecorderPlayer.addPlayBackListener((e: any) => {
          console.log('====================================');
          console.log(e.current_position, e.duration);
          console.log('====================================');
          if (e.current_position === e.duration) {
            console.log('finished');
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
          }
          setState({
            ...state,
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: audioRecorderPlayer.mmssss(
              Math.floor(e.current_position),
            ),
            duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
        });
      },
      [audioRecorderPlayer, state],
    );

    const onStopRecord = useCallback(async () => {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setState({
        ...state,
        recordSecs: 0,
      });
      console.log(result);
    }, [audioRecorderPlayer, state]);

    const onPausePlay = async () => {
      await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = async () => {
      console.log('onStopPlay');
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };

    const onStatusPress = (e: any) => {
      const touchX = e.nativeEvent.locationX;
      console.log(`touchX: ${touchX}`);
      const playWidth =
        (state.currentPositionSec / state.currentDurationSec) *
        (screenWidth - 56 * ratio);
      console.log(`currentPlayWidth: ${playWidth}`);

      const currentPosition = Math.round(state.currentPositionSec);
      console.log(`currentPosition: ${currentPosition}`);

      if (playWidth && playWidth < touchX) {
        const addSecs = Math.round(currentPosition + 1000);
        audioRecorderPlayer.seekToPlayer(addSecs);
        console.log(`addSecs: ${addSecs}`);
      } else {
        const subSecs = Math.round(currentPosition - 1000);
        audioRecorderPlayer.seekToPlayer(subSecs);
        console.log(`subSecs: ${subSecs}`);
      }
    };
    const contextValue = useMemo<MediaTransferContextValue>(
      () => ({
        onRecord: onStartRecord,
        onStop: onStopRecord,
        onPlay: onStartPlay,
      }),
      [onStartPlay, onStartRecord, onStopRecord],
    );
    return (
      <>
        <MediaTransferContext.Provider value={contextValue}>
          {children}
        </MediaTransferContext.Provider>
        <View style={styles.container}>
          <Text style={styles.titleTxt}>{'TITLE'}</Text>
          <Text style={styles.txtRecordCounter}>{state.recordTime}</Text>
          <View style={styles.viewRecorder}>
            <View style={styles.recordBtnWrapper}>
              <Button
                style={styles.btn}
                onPress={onStartRecord}
                textStyle={styles.txt}>
                {'RECORD'}
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12 * ratio,
                  },
                ]}
                onPress={onStopRecord}
                textStyle={styles.txt}>
                {'STOP'}
              </Button>
            </View>
          </View>
          <View style={styles.viewPlayer}>
            <TouchableOpacity
              style={styles.viewBarWrapper}
              onPress={onStatusPress}>
              <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, { width: playWidth }]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.txtCounter}>
              {state.playTime} / {state.duration}
            </Text>
            <View style={styles.playBtnWrapper}>
              <Button
                style={styles.btn}
                onPress={onStartPlay}
                textStyle={styles.txt}>
                {'PLAY'}
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12 * ratio,
                  },
                ]}
                onPress={onPausePlay}
                textStyle={styles.txt}>
                {'PAUSE'}
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12 * ratio,
                  },
                ]}
                onPress={onStopPlay}
                textStyle={styles.txt}>
                {'STOP'}
              </Button>
            </View>
          </View>
        </View>
      </>
    );
  },
);

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { toJS } from 'mobx';
import { Touchable } from '@/components';
import { Platform } from '@/theme';
import { useStylesHepler } from '@/utils';
import { useStylesMessages } from '../message/styles';
import { SliderAudioProps } from '../types';

const SliderAudio = ({ positions, data }: SliderAudioProps) => {
  const { styles, colors } = useStylesMessages();
  const styleHelper = useStylesHepler();
  const [isPlay, setIsPlay] = useState(false);
  const [player, setPlayer] = useState({
    currentDurationSec: 1,
    currentPositionSec: 0,
  });
  const audioRecorderPlayer: AudioRecorderPlayer = useMemo(
    () => new AudioRecorderPlayer(),
    [],
  );
  console.log('====================================');
  console.log(toJS(data));
  console.log('====================================');

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
          setPlayer({
            currentDurationSec: 1,
            currentPositionSec: 0,
          });
          setIsPlay(false);
          console.log('finished');
          audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
          return;
        }
        setPlayer({
          currentDurationSec: Number(e.duration),
          currentPositionSec: Number(e.current_position),
        });
      });
    },
    [audioRecorderPlayer],
  );

  const onPlay = useCallback(() => {
    setIsPlay(true);
    onStartPlay(data?.url);
  }, [data?.url, onStartPlay]);

  const onPausePlay = async () => {
    console.log('onStopPlay');
    setIsPlay(false);
    await audioRecorderPlayer.pausePlayer();
  };

  return (
    <View
      style={[
        styles[`msg${positions}`],
        styleHelper.row,
        { alignItems: 'center' },
      ]}>
      <Touchable onPress={isPlay ? onPausePlay : onPlay}>
        <Icon
          name={isPlay ? 'pause-outline' : 'play-outline'}
          size={Platform.SizeScale(30)}
          color={positions === 'RIGHT' ? colors.blue : colors.white}
        />
      </Touchable>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        disabled
        value={
          Number(player.currentPositionSec) / Number(player.currentDurationSec)
        }
        minimumTrackTintColor={
          positions === 'RIGHT' ? colors.white : colors.white
        }
        maximumTrackTintColor={
          positions === 'RIGHT' ? colors.white : colors.white
        }
      />
    </View>
  );
};

export default SliderAudio;

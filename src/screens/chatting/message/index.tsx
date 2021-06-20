import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { DefaultProfile } from '@/assets';
import { LazyImage, Text, Touchable } from '@/components';
import { useImageView, useVideoView } from '@/hooks';
import { Platform } from '@/theme';
import { IsIos } from '@/utils';
import SliderAudio from '../slider-audio';
import { MessageProps } from '../types';
import { useStylesMessages } from './styles';

export const Message = ({
  msg,
  time,
  messageType,
  user,
  positions,
  isFake,
  data,
  sentAt,
}: MessageProps) => {
  const { styles, colors } = useStylesMessages();
  const imageView = useImageView();
  const styleContent = useMemo(() => [styles.container, styles[positions]], [
    positions,
    styles,
  ]);
  const videoView = useVideoView();
  const [currentTime, setCurrentTime] = useState({ value: 0, count: 0 });
  const refVideo: any = useRef();

  const handleShowImg = useCallback(() => {
    imageView.show([data?.url!]);
  }, [data?.url, imageView]);

  const onFullscreen = useCallback(() => {
    videoView.show(data?.url, currentTime.value);
  }, [data?.url, currentTime, videoView]);

  const onProgress = useCallback(
    (event: any) => {
      console.log(`🛠 LOG: 🚀 -->: ------------------------------------------`);
      console.log(`🛠 LOG: 🚀 -->: onProgress -> event`, event);
      console.log(`🛠 LOG: 🚀 -->: ------------------------------------------`);
      setCurrentTime({ value: event.currentTime, count: ++currentTime.count });
    },
    [currentTime.count],
  );

  const msgBody = useMemo(() => {
    switch (messageType) {
      case CometChat.MESSAGE_TYPE.TEXT: {
        return (
          <View>
            <Text style={styles.name}>{user?.fullName}</Text>
            <Text style={styles[`msg${positions}`]}>{msg}</Text>
          </View>
        );
      }
      case CometChat.MESSAGE_TYPE.IMAGE: {
        return (
          <View>
            <Text style={styles.name}>{user?.fullName}</Text>
            <Touchable onPress={handleShowImg}>
              <LazyImage
                resizeMode="cover"
                source={data ? { uri: data?.url } : DefaultProfile}
                useLoading
                style={styles.img}
              />
            </Touchable>
          </View>
        );
      }
      case CometChat.MESSAGE_TYPE.AUDIO: {
        return <SliderAudio {...{ positions, data }} />;
      }
      case CometChat.MESSAGE_TYPE.VIDEO: {
        return (
          <>
            <VideoPlayer
              video={{ uri: data?.url }}
              videoWidth={Platform.SizeScale(500)}
              videoHeight={Platform.SizeScale(300)}
              defaultMuted
              fullScreenOnLongPress
              disableFullscreen={false}
              onProgress={onProgress}
              ref={refVideo}
            />
            {!IsIos && (
              <Touchable onPress={onFullscreen} style={styles.fullscreen}>
                <Icon
                  size={Platform.SizeScale(20)}
                  name="scan-outline"
                  color={colors.white}
                />
              </Touchable>
            )}
          </>
        );
      }
      case CometChat.MESSAGE_TYPE.CUSTOM: {
        return (
          <>
            <View style={styles.endSessionContainer}>
              <View style={styles.line} />
              <View style={styles.endSession}>
                <Text style={styles.endText}>{`${new Date(
                  sentAt * 1000,
                ).toLocaleString()}`}</Text>
              </View>
              <View style={styles.line} />
            </View>
          </>
        );
      }

      default:
        return <></>;
    }
  }, [
    messageType,
    styles,
    user?.fullName,
    positions,
    msg,
    handleShowImg,
    data,
    onProgress,
    onFullscreen,
    colors.white,
    sentAt,
  ]);

  return (
    <View style={styleContent}>
      {isFake ? (
        <ActivityIndicator style={styles.indicator} color={colors.blue} />
      ) : (
        <>
          {messageType !== CometChat.MESSAGE_TYPE.CUSTOM && (
            <Text style={styles.time}>{time}</Text>
          )}
          <View style={styles.body}>
            {positions === 'RIGHT' && (
              <LazyImage
                source={
                  !user?.avatar! ? DefaultProfile : { uri: user?.avatar! }
                }
                style={styles.avatar}
              />
            )}
            {msgBody}
          </View>
        </>
      )}
    </View>
  );
};

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { Touchable } from '@/components';
import { Platform, useTheme } from '@/theme';
import { VideoViewContext } from './context';
import { useStyleVideoView } from './styles';
import { VideoViewProps, VideoViewValue } from './types';

export const VideoViewProvider = ({ children }: VideoViewProps) => {
  const store = useLocalStore<{ isVisible: boolean; url: string }>(() => ({
    isVisible: false,
    url: '',
  }));
  const styles = useStyleVideoView();
  const { colors } = useTheme();
  const refVideo: any = useRef();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (store.isVisible) {
      setTimeout(() => {
        refVideo?.current && refVideo?.current?.seek(currentTime);
      }, 500);
    }
  }, [currentTime, store.isVisible]);

  const handleShow = useCallback(
    (url: string, time: number) => {
      store.url = url;
      store.isVisible = true;
      setCurrentTime(time);
    },
    [store],
  );

  const handleDismiss = useCallback(() => {
    store.isVisible = false;
    store.url = '';
    setCurrentTime(0);
    refVideo?.current?.stop();
  }, [store]);

  const value = useMemo<VideoViewValue>(
    () => ({
      show: handleShow,
      dismiss: handleDismiss,
    }),
    [handleDismiss, handleShow],
  );

  return (
    <VideoViewContext.Provider {...{ value }}>
      {children}
      <Observer>
        {() => {
          return (
            <Modal
              isVisible={store.isVisible}
              animationIn="fadeInUp"
              backdropOpacity={0.4}
              useNativeDriver
              animationOut="fadeOutDown"
              style={styles.container}>
              <View style={styles.content}>
                <VideoPlayer
                  video={{ uri: store?.url }}
                  videoWidth={Platform.deviceWidth}
                  videoHeight={Platform.deviceHeight}
                  defaultMuted
                  fullScreenOnLongPress
                  disableFullscreen={false}
                  onEnd={handleDismiss}
                  ref={refVideo}
                  autoplay
                />
              </View>
              <Touchable onPress={handleDismiss} style={styles.close}>
                <Icon
                  size={Platform.SizeScale(40)}
                  name="close-outline"
                  color={colors.white}
                />
              </Touchable>
            </Modal>
          );
        }}
      </Observer>
    </VideoViewContext.Provider>
  );
};

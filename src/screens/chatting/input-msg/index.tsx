import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { observer } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Text, TextField, Touchable } from '@/components';
import { useAppStore, useImagePicker, useImageView } from '@/hooks';
import { COLORS, Platform, useTheme } from '@/theme';
import { IsIos, useStylesHepler } from '@/utils';
import { ERROR_IMAGE, SEND_TYPE } from '../types';
import { useStylesInput } from './styles';

export const InputMsg = observer(
  forwardRef(
    (
      {
        onSendText,
        onSendMedia,
        disable,
        onRecord,
        onStop,
      }: {
        onSendText?: (txt: string) => void;
        onSendMedia: (
          fileName: string,
          type: string,
          mime?: string,
          path?: string,
        ) => void;
        disable: boolean;
        onRecord?: () => void;
        onStop?: () => void;
        onPlay?: () => void;
      },
      ref,
    ) => {
      const styles = useStylesInput();
      const styleHelper = useStylesHepler();
      const [txt, onChangeText] = useState('');
      const [imageOrVideo, setImageOrVideo] = useState<ImageOrVideo>();
      const [sendType, setSendType] = useState(SEND_TYPE.TEXT);
      const refInput = useRef<TextInput>(null);
      const { colors } = useTheme();
      const { chat } = useAppStore();
      const imagePicker = useImagePicker();
      const imageView = useImageView();
      const { formatMessage } = useIntl();
      const fileName = useMemo(() => {
        return IsIos
          ? imageOrVideo?.filename
          : imageOrVideo?.path.split('/')[
              imageOrVideo?.path.split('/').length - 1
            ];
      }, [imageOrVideo?.filename, imageOrVideo?.path]);
      const playVideo: any = useRef();

      // unmount
      useEffect(() => {
        return () => {
          chat.setRecordSecs(0);
          chat.setRecordTime('');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const showRecord = useCallback(() => {
        setSendType(SEND_TYPE.MEDIA);
      }, []);

      const showInputText = useCallback(() => {
        setSendType(SEND_TYPE.TEXT);
      }, []);

      const showImage = useCallback(async () => {
        try {
          setSendType(SEND_TYPE.IMAGE);
          const result: ImageOrVideo = await imagePicker.showGallery();
          if (result.mime === 'video/mp4') {
            setSendType(SEND_TYPE.VIDEO);
          }
          setImageOrVideo(result);
        } catch (error) {
          if (error.code === ERROR_IMAGE.E_PICKER_CANCELLED) {
            showInputText();
          }
        }
      }, [imagePicker, showInputText]);

      const renderLeftAccessory = useCallback(
        () => (
          <ActionButton
            position="left"
            zIndex={1000}
            offsetX={10}
            offsetY={2}
            size={Platform.SizeScale(40)}
            hideShadow={true}
            buttonColor={colors.blue}>
            <ActionButton.Item
              buttonColor={COLORS.BLUE}
              title={formatMessage({ id: 'app.chat.audio' })}
              onPress={showRecord}>
              <Icon name="mic-circle-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={COLORS.BLUE}
              title={formatMessage({ id: 'app.chat.text' })}
              onPress={showInputText}>
              <Icon
                name="chatbox-ellipses-outline"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={COLORS.BLUE}
              title={formatMessage({ id: 'app.chat.send_image_video' })}
              onPress={showImage}>
              <Icon name="images-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        ),
        [
          colors.blue,
          formatMessage,
          showImage,
          showInputText,
          showRecord,
          styles.actionButtonIcon,
        ],
      );

      const handleSend = useCallback(() => {
        switch (sendType) {
          case SEND_TYPE.TEXT:
            if (txt) {
              onSendText?.(txt);
              onChangeText('');
              refInput.current?.clear();
            }
            break;
          case SEND_TYPE.MEDIA:
            onSendMedia?.(
              `${uuidv4()}.${IsIos ? 'm4a' : 'mp4'}`,
              CometChat.MESSAGE_TYPE.AUDIO,
              `audio/x-${IsIos ? 'm4a' : 'mp4'}`,
            );
            showInputText();
            break;
          case SEND_TYPE.IMAGE:
            onSendMedia?.(
              fileName!,
              imageOrVideo?.mime.includes('video')
                ? CometChat.MESSAGE_TYPE.VIDEO
                : CometChat.MESSAGE_TYPE.IMAGE,
              imageOrVideo?.mime,
              imageOrVideo?.path!,
            );
            showInputText();
            break;
          case SEND_TYPE.VIDEO:
            onSendMedia?.(
              fileName!,
              imageOrVideo?.mime.includes('video')
                ? CometChat.MESSAGE_TYPE.VIDEO
                : CometChat.MESSAGE_TYPE.IMAGE,
              imageOrVideo?.mime,
              imageOrVideo?.path!,
            );
            showInputText();
            break;
          default:
            break;
        }
      }, [
        sendType,
        txt,
        onSendMedia,
        showInputText,
        fileName,
        imageOrVideo?.mime,
        imageOrVideo?.path,
        onSendText,
      ]);

      const onPressIn = useCallback(() => {
        chat.setRecordSecs(0);
        chat.setRecordTime('');
        onRecord?.();
      }, [chat, onRecord]);

      const onPressOut = useCallback(() => {
        onStop?.();
      }, [onStop]);

      const handleShowImg = useCallback(() => {
        imageView.show([imageOrVideo?.path!]);
      }, [imageOrVideo?.path, imageView]);

      const renderInput = useCallback(() => {
        return (
          <TextField
            ref={refInput}
            inputStyle={styles.inputStyle}
            placeholder="Aa"
            placeholderTextColor={COLORS.DARK_GRAY_2}
            autoFocus
            {...{ onChangeText }}
            style={styles.input}
          />
        );
      }, [styles.input, styles.inputStyle]);

      const onFullScreen = useCallback(() => {
        playVideo?.current?.presentFullscreenPlayer?.();
      }, []);

      const renderRecord = useCallback(() => {
        return (
          <View
            style={[styles.inputStyle, styleHelper.row, styleHelper.center]}>
            <View style={styles.recordButton}>
              <Touchable onPressIn={onPressIn} onPressOut={onPressOut}>
                <Icon
                  color={COLORS.BLUE}
                  name="mic-circle-outline"
                  size={Platform.SizeScale(30)}
                />
              </Touchable>
            </View>
            <Text style={styles.textRecord}>
              {chat.getRecordTime || formatMessage({ id: 'app.chat.record' })}
            </Text>
            <View style={styles.close}>
              <Icon65doctor name={ICONS.CLOSE} onPress={showInputText} />
            </View>
          </View>
        );
      }, [
        styles.inputStyle,
        styles.recordButton,
        styles.textRecord,
        styles.close,
        styleHelper.row,
        styleHelper.center,
        onPressIn,
        onPressOut,
        chat.getRecordTime,
        formatMessage,
        showInputText,
      ]);

      const renderImageInput = useCallback(() => {
        return (
          <Touchable
            onPress={handleShowImg}
            style={[styles.inputStyle, styleHelper.row]}>
            {/* <Text isLongText numberOfLines={1} style={styles.textRecord}>
              {fileName}
            </Text> */}
            <View style={styles.imageInput}>
              <Image
                resizeMode="center"
                style={styleHelper.image}
                source={{ uri: imageOrVideo?.sourceURL }}
              />
              <TouchableOpacity onPress={showInputText} style={styles.cancel}>
                <Icon65doctor name={ICONS.CLOSE} />
              </TouchableOpacity>
            </View>
          </Touchable>
        );
      }, [
        handleShowImg,
        styles.inputStyle,
        styles.imageInput,
        styles.cancel,
        styleHelper.row,
        styleHelper.image,
        imageOrVideo?.sourceURL,
        showInputText,
      ]);

      const renderVideoInput = useCallback(() => {
        return (
          <View style={styles.inputVideoContainer}>
            <TouchableOpacity
              onPress={onFullScreen}
              style={styles.videoContainer}>
              <Video
                source={{ uri: imageOrVideo?.sourceURL }}
                style={styles.video}
                ref={playVideo}
                // paused={pause || onSliding}
                // onProgress={onProgress}
                // onSeek={onSeek}
                // onLoad={onLoad}
                // onEnd={onEnd}
                resizeMode={'cover'}
              />
              <TouchableOpacity onPress={showInputText} style={styles.cancel}>
                <Icon65doctor name={ICONS.CLOSE} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        );
      }, [
        imageOrVideo?.sourceURL,
        onFullScreen,
        showInputText,
        styles.cancel,
        styles.inputVideoContainer,
        styles.video,
        styles.videoContainer,
      ]);

      useImperativeHandle(ref, () => ({
        showRecord,
        showInputText,
        showImage,
      }));

      return (
        <View style={styles.container}>
          {IsIos && renderLeftAccessory()}
          {sendType === SEND_TYPE.TEXT && renderInput()}
          {sendType === SEND_TYPE.MEDIA && renderRecord()}
          {sendType === SEND_TYPE.IMAGE && renderImageInput()}
          {sendType === SEND_TYPE.VIDEO && renderVideoInput()}
          <Touchable
            disabled={disable}
            onPress={handleSend}
            style={[
              styles.btnSend,
              {
                backgroundColor: disable
                  ? colors.darkGray2
                  : styles.btnSend.backgroundColor,
              },
            ]}>
            <Icon65doctor
              style={styles.icon}
              name={Icon65doctor.icons.SEND_MSG}
            />
          </Touchable>
        </View>
      );
    },
  ),
);

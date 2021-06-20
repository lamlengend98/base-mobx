import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Toast from 'react-native-tiny-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { DefaultProfile } from '@/assets';
import { AppBars, Rate, Text } from '@/components';
import { useAppStore, useCometChat, useDropdownAlert } from '@/hooks';
import { useMediaTransfer } from '@/hooks/use-media-trans';
import { COLORS, Platform, useTheme } from '@/theme';
import { showErrorToast } from '@/tools';
import { IsIos } from '@/utils';
import { confirm } from '@/utils/alert.helper';
import { InputMsg } from './input-msg';
import { Message } from './message';
import { useStylesChatting } from './styles';
import { MessageProps } from './types';

let timeoutAlert;
let timeoutStopChat;
export const ChattingScreen = observer(({ route }) => {
  const { doctorId, doctor: doctorInfo, hasSend = true } = route?.params;

  const { styles } = useStylesChatting();
  const { formatMessage } = useIntl();
  const cometChat = useCometChat();
  const { chat, appState, clinic, contact, doctor } = useAppStore();
  const { messages, isInitialization } = cometChat;
  const mediaTrans = useMediaTransfer();
  const [uri, setUri] = useState<string>('');
  const { colors } = useTheme();
  const navigation = useNavigation();
  const choiceDoctorId = useMemo(() => {
    return doctorId ? doctorId : clinic?.choicedDoctor?._65doctor_id;
  }, [clinic?.choicedDoctor?._65doctor_id, doctorId]);
  const nameDoctor = useMemo(() => {
    if (doctorInfo?.name) return doctorInfo?.name;
    return doctorInfo
      ? `${doctorInfo?.firstName} ${doctorInfo?.lastName}`
      : clinic?.choicedDoctor?.name;
  }, [clinic?.choicedDoctor?.name, doctorInfo]);
  const inputRef: any = useRef();
  const flatList: any = useRef<FlatList<MessageProps> | null>();
  const dropdowAlert = useDropdownAlert();
  // nếu có thể cho gửi tin nhắn thì check isInitialization trong store, còn nếu ko cho gửi tin nhắn thì disable luôn
  const disabled = useMemo(() => {
    if (hasSend) {
      return !isInitialization;
    }
    showErrorToast(
      formatMessage({ id: 'app.chat.notactive' }),
      Toast.position.TOP,
    );
    return !hasSend;
  }, [formatMessage, hasSend, isInitialization]);

  const renderItem = useCallback(
    ({ item }: { item: MessageProps }) => <Message {...item} />,
    [],
  );

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const onSendMedia = useCallback(
    (fileName: string, type: string, mime?: string, path: string = uri) => {
      if (!path) {
        inputRef?.current?.showInputText();
        return;
      }
      const receiverID = choiceDoctorId.toString() || '1';
      cometChat.sendMediaMessage(receiverID, fileName, type, path, mime);
    },
    [choiceDoctorId, cometChat, uri],
  );

  const onSendText = useCallback(
    (txt: string) => {
      flatList.current?.scrollToOffset({ animated: true, offset: 0 });
      cometChat.sendMessage(choiceDoctorId.toString() || '1', txt);
    },
    [cometChat, choiceDoctorId],
  );

  const onRecord = useCallback(async () => {
    const url = await mediaTrans.onRecord();
    setUri(url || '');
  }, [mediaTrans]);

  const onStop = useCallback(() => {
    mediaTrans.onStop();
  }, [mediaTrans]);

  const onPlay = useCallback(() => {
    mediaTrans.onPlay(
      'https://data-us.cometchat.io/28393c6f0c697b5/media/1610714077_899163366_9d5f57841513bcd384aff4d5e11866c5.m4a',
    );
  }, [mediaTrans]);

  const onStopChat = useCallback(async () => {
    try {
      appState.isShowLoading = true;
      await chat.stopChat(Number(chat?.startChatInfo?.id));
      navigation.goBack();
      if (!cometChat.checkLastMessageIsEndSession()) {
        cometChat.sendCustomMessage(choiceDoctorId.toString());
      }
    } catch (error) {
    } finally {
      appState.isShowLoading = false;
      contact.getChatList({
        page: 1,
        page_size: 10,
      });
      timeoutAlert && clearTimeout(timeoutAlert);
      timeoutStopChat && clearTimeout(timeoutStopChat);
      timeoutAlert = undefined;
      timeoutStopChat = undefined;
    }
  }, [appState, chat, choiceDoctorId, cometChat, contact, navigation]);

  const onPressLeft = useCallback(() => {
    if (!hasSend) {
      navigation.goBack();
      return;
    }
    confirm(
      formatMessage({ id: 'chat.confirm.end_chat' }),
      '',
      onStopChat,
      'OK',
      formatMessage({ id: 'permissions.cancel' }),
    );
  }, [formatMessage, hasSend, navigation, onStopChat]);

  const onEndReached = useCallback(() => {
    cometChat.fetchPreviousMessages(
      cometChat.userLogged,
      choiceDoctorId.toString(),
      messages[0]?.id,
    );
  }, [choiceDoctorId, cometChat, messages]);

  useEffect(() => {
    if (choiceDoctorId) {
      cometChat.buildMessages(cometChat.userLogged, choiceDoctorId.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceDoctorId]);

  useEffect(() => {
    if (hasSend) {
      timeoutAlert = setTimeout(
        () => {
          dropdowAlert.showWarning(
            formatMessage({ id: 'app.chat.warningtime' }, { second: 10 }),
            10000,
          );
          timeoutStopChat = setTimeout(() => {
            onStopChat();
          }, 10000);
        },
        doctor?.statusDoctor
          ? doctor?.statusDoctor?.chatTime?.value * 60 * 1000
          : 0,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLeftAccessory = useCallback(
    () => (
      <ActionButton
        position="left"
        zIndex={1000}
        offsetX={10}
        offsetY={10}
        size={Platform.SizeScale(40)}
        hideShadow={true}
        buttonColor={colors.blue}>
        <ActionButton.Item
          buttonColor={COLORS.BLUE}
          title={formatMessage({ id: 'app.chat.audio' })}
          onPress={inputRef?.current?.showRecord}>
          <Icon name="mic-circle-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={COLORS.BLUE}
          title={formatMessage({ id: 'app.chat.text' })}
          onPress={inputRef?.current?.showInputText}>
          <Icon
            name="chatbox-ellipses-outline"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={COLORS.BLUE}
          title={formatMessage({ id: 'app.chat.send_image_video' })}
          onPress={inputRef?.current?.showImage}>
          <Icon name="images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    ),
    [colors.blue, formatMessage, styles.actionButtonIcon],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View style={styles.header}>
        <View style={styles.circle}>
          <Image
            source={DefaultProfile}
            resizeMode="center"
            resizeMethod="resize"
            style={styles.avatar}
          />
        </View>
        <Text fontType="BOLD_SF" style={styles.name}>
          {nameDoctor}
        </Text>
        <Text style={styles.role}>Dentist</Text>
        <Rate
          percent={3}
          style={styles.rate}
          activeColor="yellow"
          inActiveColor="gray"
        />
        <Text style={styles.started}>
          {formatMessage({ id: 'app.conversation.started' })}
        </Text>
      </View>
    ),
    [
      formatMessage,
      nameDoctor,
      styles.avatar,
      styles.circle,
      styles.header,
      styles.name,
      styles.rate,
      styles.role,
      styles.started,
    ],
  );

  return (
    <View style={styles.area}>
      <AppBars title={nameDoctor} onPressLeft={onPressLeft} />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.select({
          default: 0,
          android: Platform.SizeScale(0),
        })}
        behavior={Platform.select({ android: undefined, ios: 'padding' })}>
        {!isInitialization ? (
          <ActivityIndicator style={styles.indicator} color={COLORS.BLUE} />
        ) : (
          <FlatList
            ref={flatList}
            data={[...messages].reverse()}
            inverted
            centerContent={!messages?.length}
            contentContainerStyle={styles.contentChat}
            keyboardShouldPersistTaps="handled"
            {...{ renderItem, keyExtractor, ListFooterComponent, onEndReached }}
            onEndReachedThreshold={0.5}
          />
        )}
        {!IsIos && renderLeftAccessory()}
        <InputMsg
          ref={inputRef}
          {...{ onSendText, onSendMedia, onRecord, onStop, onPlay, hasSend }}
          disable={disabled}
        />
      </KeyboardAvoidingView>
    </View>
  );
});

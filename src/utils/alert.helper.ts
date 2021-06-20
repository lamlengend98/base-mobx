import { Alert } from 'react-native';

export function alertMessage(message: string, onPress?: any, content = '') {
  setTimeout(() => {
    Alert.alert(message, content, [
      {
        text: 'OK',
        onPress: onPress,
      },
    ]);
  }, 0);
}

export const confirm = (title, message, onOk, ok, cancel) => {
  Alert.alert(title, message, [
    { text: ok, onPress: onOk },
    { text: cancel, onPress: () => {} },
  ]);
};

import Toast from 'react-native-tiny-toast';
import { COLORS } from '@/theme';

export default function showToast(
  message: string,
  type: string,
  position: number = Toast.position.BOTTOM,
  duration = 2000,
) {
  let backgroundColor;
  switch (type) {
    case 'success':
      backgroundColor = COLORS.LIGHT_GREEN;
      break;
    case 'error':
      backgroundColor = COLORS.RED;
      break;
    default:
      backgroundColor = COLORS.GRAY;
      break;
  }

  Toast.show(message, {
    position,
    duration: duration,
    textColor: COLORS.WHITE,

    containerStyle: {
      backgroundColor: backgroundColor,
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginHorizontal: 25,
      marginBottom: 30,
    },
  });
}

export function showErrorToast(message: string, position?: number) {
  showToast(message, 'error', position);
}

export function showSuccessToast(message: string, position?: number) {
  showToast(message, 'success', position);
}

export function showInfoToast(message: string, position?: number) {
  showToast(message, 'info', position);
}

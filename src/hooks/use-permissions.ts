import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Alert, Platform } from 'react-native';
import {
  openSettings,
  Permission,
  PERMISSIONS,
  requestMultiple as RNRequestMultiplePermissions,
  RESULTS,
} from 'react-native-permissions';

export function usePermissions() {
  const { formatMessage } = useIntl();

  const requestVideoCallPermission = useCallback(
    (onSuccess?: () => void) => {
      const permissions: Permission[] = Platform.select({
        ios: [PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CAMERA],
        default: [
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.CAMERA,
        ],
      });
      RNRequestMultiplePermissions(permissions).then((status) => {
        const isAcceptFull =
          Object.values(status).filter((sts) => sts === RESULTS.GRANTED)
            .length === permissions.length;

        if (isAcceptFull) {
          onSuccess?.();
        } else {
          permissions.forEach((permission) => {
            if (status[permission] !== RESULTS.GRANTED) {
              Alert.alert('', formatMessage({ id: permission }), [
                { text: formatMessage({ id: 'permissions.cancel' }) },
                {
                  text: formatMessage({ id: 'permissions.settings' }),
                  onPress: openSettings,
                },
              ]);
            }
            return;
          });
        }
      });
    },
    [formatMessage],
  );

  const requestAudioPermission = useCallback(
    (onSuccess?: () => void) => {
      const permissions: Permission[] = Platform.select({
        ios: [PERMISSIONS.IOS.MICROPHONE],
        default: [
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ],
      });
      RNRequestMultiplePermissions(permissions).then((status) => {
        const isAcceptFull =
          Object.values(status).filter((sts) => sts === RESULTS.GRANTED)
            .length === permissions.length;

        if (isAcceptFull) {
          onSuccess?.();
        } else {
          permissions.forEach((permission) => {
            if (status[permission] !== RESULTS.GRANTED) {
              Alert.alert('', formatMessage({ id: permission }), [
                { text: formatMessage({ id: 'permissions.cancel' }) },
                {
                  text: formatMessage({ id: 'permissions.settings' }),
                  onPress: openSettings,
                },
              ]);
            }
            return;
          });
        }
      });
    },
    [formatMessage],
  );

  return {
    requestVideoCallPermission,
    requestAudioPermission,
  };
}

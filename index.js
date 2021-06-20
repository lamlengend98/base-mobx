/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import 'mobx-react-lite/batchingForReactNative';
import 'react-native-gesture-handler';
import { handleBackgroundMessing } from '@/tools/network/background-messaging';
import { name as appName } from './app.json';
import { App } from './src/app';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNCallKeepBackgroundMessage', () => (props) =>
  handleBackgroundMessing(props),
);

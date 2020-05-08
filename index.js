/**
 * @format
 */
require('react-native').unstable_enableLogBox();

import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'Sending', // TODO: Remove when fixed
  'Animated',
]);
AppRegistry.registerComponent(appName, () => App);

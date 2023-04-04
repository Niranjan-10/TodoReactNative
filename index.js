/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Enable accessibility support
AppRegistry.registerComponent(
    'Accessibility',
    () => require('react-native').AccessibilityInfo,
);

AppRegistry.registerComponent(appName, () => App);
/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/navigation/App';
import {name as appName} from './app.json';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/components/theme';

// Wrapper
export default function King() {
    return (
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </NavigationContainer>
    );
  }

AppRegistry.registerComponent(appName, () => King);
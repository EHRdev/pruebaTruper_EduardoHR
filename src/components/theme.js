import { configureFonts, DarkTheme, DefaultTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { appDark, appLightGray, appOrange } from './colors';

//--------------| Dimension
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

//--------------| Theme

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'helvetica',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'tahoma',
      fontWeight: 'normal',
    },
  },
};

// Colors Themes
export const theme = {
  ...DefaultTheme,
  roundness: 8,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: appDark,
    accent: appOrange,
    background: appLightGray,
    surface: appDark
  },
};
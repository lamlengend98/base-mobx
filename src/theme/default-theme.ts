import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { Platform } from './platform';

export const DefaultTheme = {
  colors: {
    black: COLORS.BLACK,
    white: COLORS.WHITE,
    blue: COLORS.BLUE,
    darkBlue: COLORS.DARK_BLUE,
    green: COLORS.GREEN,
    lightGreen: COLORS.LIGHT_GREEN,
    gray: COLORS.GRAY,
    red: COLORS.RED,
    darkGray: COLORS.DARK_GRAY,
    darkGray2: COLORS.DARK_GRAY_2,
    lightGray: COLORS.LIGHT_GRAY,
    lightGray2: COLORS.LIGHT_GRAY_2,
    inputBorder: COLORS.BLACK,
    inputLabel: COLORS.BLACK,
    inputPrefix: COLORS.BLACK,
    borderFocus: COLORS.BLACK,
    loading: COLORS.RED,
    overlayTopic: COLORS.OVERLAY_GREEN,
    yellow: COLORS.YELLOW,
    bgCall: COLORS.WHITE,
    bgActionPhone: COLORS.BG_ACTION_PHONE,
    iconTab: COLORS.ICON_COLOR,
    bgChat: COLORS.BG_CHAT,
    sliverChalice: COLORS.SILVER_CHALICE,
    wildSand: COLORS.WILD_SAND,
    bgMsgLeft: COLORS.BG_MSG_LEFT,
    whiteGreen: COLORS.WHITE_GREEN,
    vividRed: COLORS.VIVID_RED,
    moderateCyan: COLORS.MODERATE_CYAN,
    transparent: COLORS.TRANSPARENT,
    lightBlue: COLORS.LIGHT_BLUE,
    grayish: COLORS.GRAYISH,
    softCyan: COLORS.SOFT_CYAN,
    darkBlue2: COLORS.DARK_BLUE_2,
  },
  typography: StyleSheet.create({
    thinRoboto: {
      fontFamily: 'Roboto-Thin',
      fontSize: Platform.SizeScale(),
      color: COLORS.BLACK,
    },
    regularRoboto: {
      fontFamily: 'Roboto-Regular',
      fontSize: Platform.SizeScale(),
      color: COLORS.DARK_GRAY,
    },
    mediumRoboto: {
      fontFamily: 'Roboto-Medium',
      fontSize: Platform.SizeScale(),
      color: COLORS.BLACK,
    },
    boldRoboto: {
      fontFamily: 'Roboto-Bold',
      fontSize: Platform.SizeScale(),
      color: COLORS.DARK_GRAY,
    },

    regularSfPro: {
      fontFamily:
        Platform.OS === 'ios' ? 'Roboto-Regular' : 'SF-Pro-Text-Regular',
      fontSize: Platform.SizeScale(),
      color: COLORS.DARK_GRAY,
    },
    mediumSfPro: {
      fontFamily:
        Platform.OS === 'ios' ? 'SFProText-Medium' : 'SF-Pro-Text-Medium',
      fontSize: Platform.SizeScale(),
      color: COLORS.BLACK,
    },
    boldSfPro: {
      fontFamily: Platform.OS === 'ios' ? 'SFProText-Bold' : 'SF-Pro-Text-Bold',
      fontSize: Platform.SizeScale(),
      color: COLORS.DARK_GRAY,
    },
  }),
};

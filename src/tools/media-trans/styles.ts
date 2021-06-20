import { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);
if (width <= height) {
  if (calRatio < 9) {
    calRatio = width / 9;
  } else {
    calRatio = height / 18;
  }
} else {
  if (calRatio < 9) {
    calRatio = height / 9;
  } else {
    calRatio = width / 18;
  }
}

export const screenWidth = width;
export const screenHeight = height;
export const ratio = calRatio / (360 / 9);
export const useStyleMediaTrans = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: '#455A64',
          flexDirection: 'column',
          alignItems: 'center',
          ...StyleSheet.absoluteFillObject,
          height,
          zIndex: -1,
        },
        titleTxt: {
          marginTop: 100 * ratio,
          color: 'white',
          fontSize: 28 * ratio,
        },
        viewRecorder: {
          marginTop: 40 * ratio,
          width: '100%',
          alignItems: 'center',
        },
        recordBtnWrapper: {
          flexDirection: 'row',
        },
        viewPlayer: {
          marginTop: 60 * ratio,
          alignSelf: 'stretch',
          alignItems: 'center',
        },
        viewBarWrapper: {
          marginTop: 28 * ratio,
          marginHorizontal: 28 * ratio,
          alignSelf: 'stretch',
        },
        viewBar: {
          backgroundColor: '#ccc',
          height: 4 * ratio,
          alignSelf: 'stretch',
        },
        viewBarPlay: {
          backgroundColor: 'white',
          height: 4 * ratio,
          width: 0,
        },
        playStatusTxt: {
          marginTop: 8 * ratio,
          color: '#ccc',
        },
        playBtnWrapper: {
          flexDirection: 'row',
          marginTop: 40 * ratio,
        },
        btn: {
          borderColor: 'white',
          borderWidth: 1 * ratio,
        },
        txt: {
          color: 'white',
          fontSize: 14 * ratio,
          marginHorizontal: 8 * ratio,
          marginVertical: 4 * ratio,
        },
        txtRecordCounter: {
          marginTop: 32 * ratio,
          color: 'white',
          fontSize: 20 * ratio,
          textAlignVertical: 'center',
          fontWeight: '200',
          fontFamily: 'Helvetica Neue',
          letterSpacing: 3,
        },
        txtCounter: {
          marginTop: 12 * ratio,
          color: 'white',
          fontSize: 20 * ratio,
          textAlignVertical: 'center',
          fontWeight: '200',
          fontFamily: 'Helvetica Neue',
          letterSpacing: 3,
        },
      }),
    [],
  );
};

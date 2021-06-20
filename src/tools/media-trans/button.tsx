import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ratio } from './styles';

// import NativeButton from 'apsl-react-native-button';

const styles: any = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 2 * ratio,
    width: 320 * ratio,
    height: 52 * ratio,
    borderColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14 * ratio,
    color: 'white',
  },
  imgLeft: {
    width: 24 * ratio,
    height: 24 * ratio,
    position: 'absolute',
    left: 16 * ratio,
  },
});

interface ItemProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  style?: any;
  disabledStyle?: any;
  textStyle?: any;
  imgLeftSrc?: any;
  imgLeftStyle?: any;
  indicatorColor?: string;
  activeOpacity?: number;
}

class Button extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    isLoading: false,
    isDisabled: false,
    style: styles.btn,
    textStyle: styles.txt,
    imgLeftStyle: styles.imgLeft,
    indicatorColor: 'white',
    activeOpacity: 0.5,
  };

  constructor(props: ItemProps) {
    super(props);
    this.state = {};
  }

  public render() {
    if (this.props.isDisabled) {
      return (
        <View style={this.props.disabledStyle}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }
    if (this.props.isLoading) {
      return (
        <View style={this.props.style}>
          <ActivityIndicator size="small" color={this.props.indicatorColor} />
        </View>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={this.props.onPress}>
        <View style={this.props.style}>
          {this.props.imgLeftSrc ? (
            <Image
              style={this.props.imgLeftStyle}
              source={this.props.imgLeftSrc}
            />
          ) : null}
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;

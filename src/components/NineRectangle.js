import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import Utils from '../utils/Utils'
import * as Config from '../constants/Config'


class NineReactangle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {image, rect} = this.props;

    return (
      <Image source={image} style={[styles.container, styles.image]} capInsets={rect}>
        {this.props.children}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'stretch'
  }
});

module.exports = NineReactangle;
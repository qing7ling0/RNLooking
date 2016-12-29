'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView
} from 'react-native'

import BaseScene from '../components/BaseScene'
import ContentComponent from '../components/ContentComponent'
import WWebView from '../components/WWebView'

var DEFAULT_URL = 'http://www.beibei.com/detail/15838700.html'
export default class ZoneDetail extends BaseScene {
  constructor(props) {
    super(props);
  }

  _renderContent() {
    return <WWebView url={DEFAULT_URL} />;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ContentComponent title={' '} backTitle={'返回'} renderContent={this._renderContent.bind(this)} backPressed={this.componentBack} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
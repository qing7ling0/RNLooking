/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import LayoutTest from './Test/LayoutTest';

class RNLooking extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'LayoutTest', component: LayoutTest, index: 0, params: {} }}
        renderScene={(route, navigator) => {
          var Component1 = route.component;
          <LayoutTest />
        }}
      />
    );
    
  }
}

AppRegistry.registerComponent('RNLooking', () => RNLooking);

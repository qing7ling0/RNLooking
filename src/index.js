import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator
} from 'react-native';
import application from './application'


class index extends Component {
  render() {

    let defaultConfig = Navigator.SceneConfigs.FloatFromRight;

    return (
      <Navigator
        initialRoute={{ component: application, params: {}, sceneConfig:defaultConfig }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return (<Component {...route.params} navigator={navigator} />);
        }}
      />
    );
    
  }
}
module.exports = index;
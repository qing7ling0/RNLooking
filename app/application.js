import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator
} from 'react-native';
import SplashPage from './page/SplashPage'


class application extends Component {
  render() {

    let defaultConfig = Navigator.SceneConfigs.FloatFromRight;

    return (
      <Navigator
        initialRoute={{ component: SplashPage, params: {}, sceneConfig:defaultConfig }}
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
module.exports = application;
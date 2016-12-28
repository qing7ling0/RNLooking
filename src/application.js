import React, { Component } from 'react';
var ReactNative, {
  View,
  Navigator} = require('react-native');
import {Provider} from 'react-redux';
import SplashScene from './containers/SplashScene';
 
import ConfigureStore from './ConfigureStore';
const store = ConfigureStore();//获取store
 
export default class application extends Component{

  render(){
    let defaultConfig = Navigator.SceneConfigs.FloatFromRight;

    return(
      <Provider store={store}>
        <Navigator
          initialRoute={{ component: SplashScene, params: {}, sceneConfig:defaultConfig }}
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
      </Provider>
     );
   }
}
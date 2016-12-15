import React from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    Navigator
} from 'react-native';

import BaseComponent from '../components/BaseScene'
import HomeScene from './HomeScene'
import QQScene from './QQScene'

class SplashScene extends BaseComponent {
  constructor(props) {
    super(props);
    this.titlePos = {x:-1000, y:0}
    this.state = {
      movePos: new Animated.Value(-1000),
    };
  }

  render() {
    return(
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Animated.Text
              style={{
                left: this.state.movePos,
                fontSize: 26,
                fontWeight: 'bold',
              }}
            >Wu Qingqing works</Animated.Text>
        </View>
    );
  }
  
  componentDidMount() {
    Animated.timing(
     this.state.movePos,         // Auto-multiplexed
     {
      toValue: 0,
      easing: Easing.ease,
      duration: 1500
     } // Back to zero
   ).start((ret) => {
      if (ret.finished) {
        setTimeout(()=>{
          this.navigator.push({
            component: QQScene,
            sceneConfig: Navigator.SceneConfigs.FloatFromRight,
          });
        }, 1000)
      }
   });
  }
}

module.exports = SplashScene;
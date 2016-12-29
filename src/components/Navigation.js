/*!
 *
 * 封装Navigator
 * 所有的切换过场动画都是从底部往上；回退是从上往下
 */
import React, {Component} from 'react'
import {
  View,
  Navigator
} from 'react-native'

export default class Counter extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ type: '', component: this.props.component, params: this.props.params }}
        configureScene={(route) => {
          if (route.type == 'show') {
              return Navigator.SceneConfigs.FloatFromBottom
          } else {
              return Navigator.SceneConfigs.FloatFromRight
          }
        }}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return (<Component navigator={navigator} route={route} {...route.params}/>);
        }}/>
    )
  }
}

import React, {Component} from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  PixelRatio,
  PanResponder,
  Easing,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Skin} from '../modules/Skin';
import Utils from '../utils/Utils';
import * as Config from '../constants/Config.js';

export default class TouchMoveItem extends Component {
  constructor(props) {
    super(props);
    this.moveRelease = this._moveRelease.bind(this);
    this.state = {
      centerSize: {w:0, h:0},
      rightSize: {w:10000,h:0},
      moveOff: new Animated.ValueXY()
    }
    this.moveOff = {x:0,y:0};
    this.state.moveOff.addListener((value) => {
      this.moveOff = value;
    });
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx > 5 || gestureState.dx < -5;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.state.moveOff.stopAnimation((value) => {
          this.state.moveOff.setOffset(value);
          this.state.moveOff.setValue({x: 0, y: 0});
        });
      },
      onPanResponderMove: Animated.event(
          [null, {dx: this.state.moveOff.x, dy:this.state.moveOff.y}] // 绑定动画值
        ),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('onPanResponderRelease vx=' + gestureState.vx);
        this.moveRelease(false, gestureState.vx);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.moveRelease(true, gestureState.vx);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }

  render() {
    const { renderContent, renderRight} = this.props;
    return (
      <View 
        {...this._panResponder.panHandlers}
        style={styles.container}
        onLayout={(e)=>{
          this.setState({
            centerSize: {w:e.nativeEvent.layout.width, h:e.nativeEvent.layout.height},
          });
        }}
      >
        <Animated.View
          style={[styles.contentCenter, {
            width:this.state.centerSize.w,
            height:this.state.centerSize.h,
            left:this.state.moveOff.x.interpolate({
                  inputRange: [-this.state.rightSize.w-1, -this.state.rightSize.w, 0, 1],
                  outputRange:[-this.state.rightSize.w, -this.state.rightSize.w, 0, 0]
                })
          }]}>
            {renderContent ? renderContent : null}
        </Animated.View>
        {
          renderRight ?
          <Animated.View 
            style={[styles.contentRight, {
              right:-this.state.rightSize.w,
              height:this.state.centerSize.h,
              transform:[
                {
                  translateX: this.state.moveOff.x.interpolate({
                    inputRange: [-this.state.rightSize.w-1, -this.state.rightSize.w, 0],
                    outputRange:[-this.state.rightSize.w, -this.state.rightSize.w, 0]
                  })
                }
              ],
            }]}
            onLayout={(e)=>{
              if (e.nativeEvent.layout.width > 0) {
                this.setState({
                  rightSize: {w:e.nativeEvent.layout.width, h:e.nativeEvent.layout.height},
                });
              }
            }}>
            {renderRight}
          </Animated.View>
          :
          null
        }
      </View>
    )
  }

  _moveRelease(reset, speed) {
    this.state.moveOff.flattenOffset();
    let movex = this.moveOff.x;
    if (reset) {
      Animated.timing(this.state.moveOff,{toValue: {x: 0, y: 0}, easing: Easing.quad, duration:200}).start();
    } else {
      if ((movex < -this.state.rightSize.w/2 && speed < 0.1) || speed < -0.1) {
        Animated.timing(this.state.moveOff,{toValue: {x: -this.state.rightSize.w, y: 0}, easing: Easing.quad, duration:200}).start();
      } else {
        Animated.timing(this.state.moveOff,{toValue: {x: 0, y: 0}, easing: Easing.quad, duration:200}).start();
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  innerContainer: {
    flex: 1,
  },
  contentCenter:{
    flex: 1,
  },
  contentRight:{
    position: 'absolute',
  }
});


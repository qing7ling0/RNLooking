/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  NativeModules,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const RNLookingModule = NativeModules.RNLookingModule;


export default class loadding extends Component{
  constructor(props) {
    super(props);

    this.state = {
      text: 'load',
      loaded: false
    }

  }

  componentDidMount() {
  }

  _loadBundles() {
    this.setState({
      text: 'loading',
    });
    RNLookingModule.LoadBundle('index.android.bundle.app')
    .then((data)=>{
      if(data) {
        this.setState({
          loaded: true,
          text: 'loadding success!'
        });
      } else {
        this.setState({
          loaded: false,
          text: 'loadding failed!'
        });
      }
    });
  }

  render(){

    if (this.state.loaded) {
      let Component = require('./src/index.js')
      return (
        <Component/>
      );
    } else {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity
            onPress={this._loadBundles.bind(this)}
          >
            <View style={{width:200, height:100,justifyContent:'center', alignItems:'center', backgroundColor:'#f5f5f5', borderColor:'#00ff00', borderRadius:5, borderWidth:1}} >
              <Text>{this.state.text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
if(__DEV__){
    // debug模式
  let index = require('./src/index.js')
  AppRegistry.registerComponent('RNLooking', () => index);
}else{
    // release模式
  AppRegistry.registerComponent('RNLooking', () => loadding);
}


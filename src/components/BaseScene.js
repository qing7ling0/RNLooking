import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  Text,
  BackAndroid
} from 'react-native';

class BaseScene extends Component {

    constructor(props) {
        super(props);
        this.componentBack = this.componentBack.bind(this);
        this.navigator = this.props.navigator;
        this.sceneTag = "baseScene"
        console.log('BaseScene constructor');
    }

    componentDidMount() {
      BackAndroid.addEventListener(this.sceneTag, ()=>{
        this.componentBack();
        return true;
      });
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener(this.sceneTag, ()=>{});
    }

    componentBack() {
      if (this.navigator.getCurrentRoutes().length > 0) {
        this.navigator.pop();
      } else {
        BackAndroid.exitApp();
      }
    }
}

module.exports = BaseScene;
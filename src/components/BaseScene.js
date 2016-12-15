import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  Text
} from 'react-native';

class BaseScene extends Component {

    constructor(props) {
        super(props);
        this.back.bind(this);
        this.navigator = this.props.navigator;
        console.log('BaseScene constructor');
    }

    back() {
        this.navigator.pop();
    }
}

module.exports = BaseScene;
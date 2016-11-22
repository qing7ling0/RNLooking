import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  Text
} from 'react-native';

class LLComponent extends Component {

    constructor(props) {
        super(props);
        this.back.bind(this);
        this.navigator = this.props.navigator;
        console.log('LLComponent constructor');
    }

    back() {
        this.navigator.pop();
    }
}

module.exports = LLComponent;
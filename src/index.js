import React, { Component } from 'react';
var ReactNative = require('react-native');
import {Provider} from 'react-redux';
import App from './containers/app';
 
import configureStore from './configureStore';
const store=configureStore();//获取store
 
export default class index extends Component{

  render(){
     return(
      <Provider store={store}>
        <App />
      </Provider>
     );
   }
}
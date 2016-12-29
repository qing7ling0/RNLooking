import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import Utils from '../utils/Utils'
import {Skin} from '../modules/Skin'
import * as Config from '../constants/Config'
import Header from './Header'


class ContentComponent extends Component {
  constructor(props) {
    super(props);
  }

  _renderBtnBack() {
    return (
      <TouchableOpacity onPress={this._btnBackPressed.bind(this)} style={styles.flex}>
        <View style={styles.backContainer}>
          <Image source={require('../image/mgg.png')} style={styles.backImage} />
          <Text style={styles.backTitle}>{this.props.backTitle}</Text>
        </View> 
      </TouchableOpacity>
    );
  }

  _btnBackPressed() {
    if (this.props.backPressed) {
      this.props.backPressed();
    }
  }

  render() {
    let content = null;
    if (this.props.renderContent) {
      content = this.props.renderContent();
    }
    return (
      <View style={styles.container}>
        <Header title={this.props.title} renderLeftBtn={this._renderBtnBack.bind(this)} renderRightBtn={()=>{return null}} />
        <View style={styles.flex}>{content}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin.bodyBackgroundColor
  },
  flex: {
    flex: 1
  },
  backContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Utils.px2dp(36),
  },
  backImage: {
    width: Utils.px2dp(45),
    height: Utils.px2dp(63),
  },
  backTitle: {
    fontSize: Utils.fontSize2RN(50),
    color: Skin.headTitleBtnContentTextColor
  }
});

module.exports = ContentComponent;
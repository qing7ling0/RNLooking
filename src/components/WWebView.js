'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView,
  Image,
  Easing,
  Animated,
  InteractionManager
} from 'react-native'

import BaseScene from './BaseScene'
import ContentComponent from './ContentComponent'
import Utils from '../utils/Utils'
import {Skin} from '../modules/Skin'

const BtnImages = [
  require('../image/a6v.png'),
  require('../image/a6x.png'),
  require('../image/a6z.png'),
  require('../image/a75.png'),
  require('../image/a6w.png'),
]
const MenuDatas = [
  {name:'收藏', icon: require('../image/usercenter_data_favorite.png')},
  {name:'下载/文件', icon: require('../image/usercenter_data_download.png')},
  {name:'小说书架', icon: require('../image/usercenter_data_bookshelf.png')},
  {name:'我的视频', icon: require('../image/usercenter_data_video.png')},
  {name:'主题', icon: require('../image/usercenter_data_my_theme.png')},
  {name:'收藏网址', icon: require('../image/uk.png')},
  {name:'夜间模式', icon: require('../image/uw.png')},
  {name:'方向', icon: require('../image/uv.png')},
  {name:'刷新', icon: require('../image/v3.png')},
  {name:'退出', icon: require('../image/ur.png')},
]

const BtnNames = ['Btn1', 'Btn2', 'Btn3', 'Btn4', 'Btn5']

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var WEBVIEW_REF = 'webview';
var SUB_MENU_REF = 'submenu';
var HOME_URL = 'http://www.baidu.com'
export default class WWebView extends Component {
  constructor(props) {
    super(props);
    this.subMenuHeight = 0;
    this.barHeight = 0;

    this.state = {
      url: this.props.url,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      scalesPageToFit: true,
      subMenuAnimiValue: new Animated.Value(-1000),
      subMenuShow: false,
      loaded: false
    };

  }

  _subMenuLayout(e) {
    if (this.subMenuHeight != e.nativeEvent.layout.height) {
      this.subMenuHeight = e.nativeEvent.layout.height;
      this._initSubMenu.bind(this)();
    }
  }

  _barLayout(e) {
    if (this.barHeight != e.nativeEvent.layout.height) {
      this.barHeight = e.nativeEvent.layout.height;
      this._initSubMenu.bind(this)();
    }
  }

  _initSubMenu() {
    let off = -this.barHeight - this.subMenuHeight;
    this.state.subMenuAnimiValue.setValue(off);
    this.refs[SUB_MENU_REF].bottom = off;
  }

  _subMenuShow(show) {
    let toValue = show ? this.barHeight : -this.subMenuHeight;
    Animated.timing(this.state.subMenuAnimiValue, {toValue: toValue, easing: Easing.quad, duration:300}).start();
    this.setState({
      subMenuShow: show,
    });
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({loaded: true});
    });
  }

  render() {
    let subMenuRow1 = [];
    let subMenuRow2 = [];
    for(let i=0; i<MenuDatas.length; i++) {
      let data = MenuDatas[i];
      let item = (<View key={'subMenuBtn'+i} style={styles.subMenuItemContainer}>
          <Image source={data.icon} style={styles.subMenuItemIcon} />
          <Text style={styles.subMenuItemText}>{data.name}</Text>
        </View>);
      i < 5 ? subMenuRow1.push(item) : subMenuRow2.push(item);
    }
    return (
      <View style={[styles.container]}>
        {
          this.state.loaded ?
          <WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{uri: this.state.url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
          />
          :
          <View style={styles.webView}></View>
        }
        
        <Animated.View 
          style={[styles.subMenuContainer, {bottom:this.state.subMenuAnimiValue}]} 
          ref={SUB_MENU_REF}
          onLayout={this._subMenuLayout.bind(this)}
          >
          <View style={styles.subMenuContainerInner}>
            <View style={styles.subMenuRow}>{subMenuRow1}</View>
            <View style={styles.subMenuRow}>{subMenuRow2}</View>
          </View>
        </Animated.View>
        <View style={styles.barContainer} onLayout={this._barLayout.bind(this)}>
          <TouchableOpacity onPress={this._goBack.bind(this)}>
            <Image source={BtnImages[0]} ref={BtnNames[0]} style={[styles.barImage, this.state.backButtonEnabled ? styles.enabled : styles.disabled]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._goForward.bind(this)}>
            <Image source={BtnImages[1]} ref={BtnNames[1]} style={[styles.barImage, this.state.forwardButtonEnabled ? styles.enabled : styles.disabled]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._menuPressed.bind(this)}>
            <Image source={BtnImages[2]} ref={BtnNames[2]} style={[styles.barImage, this.state.subMenuShow ? styles.disabled : styles.enabled]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._reload.bind(this)}>
            <Image source={BtnImages[3]} ref={BtnNames[3]} style={[styles.barImage]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._tabPressed.bind(this)}>
            <Image source={BtnImages[4]} ref={BtnNames[4]} style={[styles.barImage]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _goBack(){
    this.refs[WEBVIEW_REF].goBack();
  }

  _goForward() {
    this.refs[WEBVIEW_REF].goForward();
  }

  _menuPressed() {
    this._subMenuShow.bind(this)(!this.state.subMenuShow);
  }

  _tabPressed() {

  }

  _reload() {
    this.refs[WEBVIEW_REF].reload();
  }

  _onShouldStartLoadWithRequest(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  }

  _onNavigationStateChange(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGWASH,
  },
  flex: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: BGWASH,
  },
  enabled: {
    tintColor: '#000000',
  },
  disabled: {
    tintColor: '#aaa'
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: Utils.px2dp(1),
    borderColor: '#cdcdcd',
    paddingTop: Utils.px2dp(20),
    paddingBottom: Utils.px2dp(20),
    backgroundColor: Skin.bodyBackgroundColor,
  },
  barImage: {
    width: Utils.px2dp(80),
    height: Utils.px2dp(80),
    resizeMode: 'contain'
  },
  subMenuContainer: {
    flex:1,
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: Utils.px2dp(30),
    paddingBottom: Utils.px2dp(30),
    borderTopWidth: Utils.px2dp(1),
    borderColor: '#cdcdcd',
    backgroundColor: Skin.bodyBackgroundColor,
  },
  subMenuContainerInner: {
    flex:1,
  },
  subMenuRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    paddingTop: Utils.px2dp(20),
    paddingBottom: Utils.px2dp(20),
  },
  subMenuItemContainer: {
    flex:1,
    alignItems: 'center'
  },
  subMenuItemIcon: {
    width: Utils.px2dp(80),
    height: Utils.px2dp(80),
    resizeMode: 'contain'
  },
  subMenuItemText: {
    marginTop: Utils.px2dp(10),
    fontSize: Utils.fontSize2RN(35),
    color: Skin.messageListItemTitleColor
  }
});
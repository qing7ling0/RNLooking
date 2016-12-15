'use strict';
/**
 * App主入口
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  AsyncStorage } from 'react-native'
import * as AppActions from '../actions/AppActions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigation from 'react-native-tab-navigator'

import Utils from '../utils/Utils'
import MessageList from './MessageList'
import FriendsList from './FriendsList'
import Zone from './Zone'
import * as Config from '../constants/Config.js';
import Navigation from '../components/Navigation'


class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    const { maskRender, hideMoreMenu, showMainNav, currentNavID } = this.props;
    return (
      <View style={styles.container}>
        <TabNavigation
            tabBarStyle={styles.tabStyle}>
          <TabNavigation.Item
            selected={currentNavID===Config.MAIN_NAV_ID.NAV_MESSAGE}
            renderIcon={() => <Image source={require('../image/skin_tab_icon_conversation_normal.png')} style={styles.tabItemIcon} />}
            renderSelectedIcon={() => <Image source={require('../image/skin_tab_icon_conversation_selected.png')} style={styles.tabItemIcon} />}
            onPress={() => {showMainNav(Config.MAIN_NAV_ID.NAV_MESSAGE);}}>
            <Navigation component={MessageList}/>
          </TabNavigation.Item>
          <TabNavigation.Item
            selected={currentNavID===Config.MAIN_NAV_ID.NAV_CONTACT}
            renderIcon={() => <Image source={require('../image/skin_tab_icon_contact_normal.png')} style={styles.tabItemIcon} />}
            renderSelectedIcon={() => <Image source={require('../image/skin_tab_icon_contact_selected.png')} style={styles.tabItemIcon} />}
            onPress={() => { showMainNav(Config.MAIN_NAV_ID.NAV_CONTACT); } }>
            <Navigation component={FriendsList}/>
          </TabNavigation.Item>
          <TabNavigation.Item
            selected={currentNavID===Config.MAIN_NAV_ID.NAV_ZONE}
            renderIcon={() => <Image source={require('../image/skin_tab_icon_plugin_normal.png')} style={styles.tabItemIcon} />}
            renderSelectedIcon={() => <Image source={require('../image/skin_tab_icon_plugin_selected.png')} style={styles.tabItemIcon} />}
            onPress={() => { showMainNav(Config.MAIN_NAV_ID.NAV_ZONE); } }>
            <Navigation component={Zone}/>
          </TabNavigation.Item>
        </TabNavigation>
        {
          maskRender ? 
          <View style={styles.maskContainer}>
            <TouchableWithoutFeedback 
              onPress= {()=>{hideMoreMenu()}}
            ><View
              style={styles.maskBg}></View></TouchableWithoutFeedback>
            {maskRender()}
          </View>
          : null
        }
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    height: Utils.px2dp(160)
  },
  tabItemIcon: {
    height: Utils.px2dp(160),
    width: Utils.px2dp(160),
    resizeMode: 'contain'
  },
  maskContainer: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: Utils.size.width, 
    height: Utils.size.height
  },
  maskBg: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: Utils.size.width, 
    height: Utils.size.height,
    backgroundColor: '#000000',
    opacity: 0.1
  }
})

export default connect(state => ({
    maskRender: state.app.maskRender || null,
    currentNavID: state.app.mainNav  || Config.MAIN_NAV_ID.NAV_MESSAGE
  }),
  (dispatch) => ({
    hideMoreMenu: () => dispatch(AppActions.hideMoreMenu()),
    showMainNav: (navID) => dispatch(AppActions.showMainNav(navID))
  })
)(App);
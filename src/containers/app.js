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
import * as appActions from '../actions/appActions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import utils from '../utils/utils'
import Icon from 'react-native-vector-icons/Ionicons'
import MessageList from './messageList'
import FriendsList from './friendsList'
import Zone from './zone'
import * as config from '../constants/config.js';
import Navigation from '../components/Navigation'
import TabNavigation from 'react-native-tab-navigator'


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
            selected={currentNavID===config.MAIN_NAV_ID.NAV_MESSAGE}
            renderIcon={() => <Image source={require('../image/skin_tab_icon_conversation_normal.png')} style={styles.tabItemIcon} />}
            renderSelectedIcon={() => <Image source={require('../image/skin_tab_icon_conversation_selected.png')} style={styles.tabItemIcon} />}
            onPress={() => {showMainNav(config.MAIN_NAV_ID.NAV_MESSAGE);}}>
            <Navigation component={MessageList}/>
          </TabNavigation.Item>
          <TabNavigation.Item
            selected={currentNavID===config.MAIN_NAV_ID.NAV_CONTACT}
            renderIcon={() => <Image source={require('../image/skin_tab_icon_contact_normal.png')} style={styles.tabItemIcon} />}
            renderSelectedIcon={() => <Image source={require('../image/skin_tab_icon_contact_selected.png')} style={styles.tabItemIcon} />}
            onPress={() => { showMainNav(config.MAIN_NAV_ID.NAV_CONTACT); } }>
            <Navigation component={FriendsList}/>
          </TabNavigation.Item>
          <TabNavigation.Item
            selected={currentNavID===config.MAIN_NAV_ID.NAV_ZONE}
            renderIcon={() => <Image source={require('../image/skin_tab_icon_plugin_normal.png')} style={styles.tabItemIcon} />}
            renderSelectedIcon={() => <Image source={require('../image/skin_tab_icon_plugin_selected.png')} style={styles.tabItemIcon} />}
            onPress={() => { showMainNav(config.MAIN_NAV_ID.NAV_ZONE); } }>
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
    height: utils.px2dp(160)
  },
  tabItemIcon: {
    height: utils.px2dp(160),
    width: utils.px2dp(160),
    resizeMode: 'contain'
  },
  maskContainer: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: utils.size.width, 
    height: utils.size.height
  },
  maskBg: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: utils.size.width, 
    height: utils.size.height,
    backgroundColor: '#000000',
    opacity: 0.1
  }
})

export default connect(state => ({
    maskRender: state.app.maskRender || null,
    currentNavID: state.app.mainNav  || config.MAIN_NAV_ID.NAV_MESSAGE
  }),
  (dispatch) => ({
    hideMoreMenu: () => dispatch(appActions.hideMoreMenu()),
    showMainNav: (navID) => dispatch(appActions.showMainNav(navID))
  })
)(App);
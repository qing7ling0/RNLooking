'use strict';

import React, { Component } from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView,
  RefreshControl,
  Navigator,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as AppActions from '../actions/AppActions'
import { connect } from 'react-redux'
import Utils from '../utils/Utils'
import Header from '../components/Header'
import {Skin} from '../modules/Skin';
import * as Config from '../constants/Config';
import TouchMoveItem from '../components/TouchMoveItem'
import Test from '../constants/Test';
import ZoneDetail from './ZoneDetail'

const listZoneIcons = {
  1: require('../image/zone_icon_1.png'),
  2: require('../image/zone_icon_2.png'),
  3: require('../image/zone_icon_3.png'),
  4: require('../image/zone_icon_4.png'),
  5: require('../image/zone_icon_5.png'),
  6: require('../image/zone_icon_6.png')
}

class zone extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      groupsExpander:[],
    }
  }

  componentDidMount() {
    const {getZoneDatas} = this.props;
    getZoneDatas();
  }

  render() {
    const { zoneDatas} = this.props;

    if (zoneDatas) {
      let datas = this.ds.cloneWithRows(zoneDatas);
      return (
        <View style={styles.container}>
          <Header 
            title={'动态'+Test.name} 
            navigator={this.props.navigator}
            renderRightBtn= {this._renderHeaderRightBtn.bind(this)()}
            />
          <View style={styles.flex}>
            <ListView
              dataSource={datas}
              initialListSize={10}
              pageSize={1}
              renderRow={this._renderRow.bind(this)}
              renderHeader={this._renderHeader.bind(this) }
              />
          </View>
        </View>
      );
    } else {
      return (null);
    }
  }

  _renderHeaderRightBtn() {
    return (

      <TouchableOpacity 
        style={styles.flex}
        onPress={() =>{}}>
        <Text style={styles.headerTitleText} >更多</Text>
      </TouchableOpacity>
    );
  }

  _headOptionCallback(type) {
    switch(type) {
      case Config.HEAD_OPTION_TYPE.TYPE_SHOW_MORE_MENU:
      {
        const {showMoreMenu} = this.props;
        showMoreMenu(this._renderMoreMenu.bind(this));
      }
      break;
      case Config.HEAD_OPTION_TYPE.TYPE_SHOW_MESSAGE_LIST:
      break;
      case Config.HEAD_OPTION_TYPE.TYPE_SHOW_USER_INFO:
      break;
      case Config.HEAD_OPTION_TYPE.TYPE_SHOW_PHONE_LIST:
      break;
      case Config.HEAD_OPTION_TYPE.TYPE_SHOW_MORE_ZONE:
      break;
      case Config.HEAD_OPTION_TYPE.TYPE_SHOW_ADD_FRIEND_VIEW:
      break;
    }
  }

  _renderRow(rowData, sectionID, rowId) {
    return (
      <TouchableHighlight
        underlayColor= {'#c6dff1'}
        style={styles.flex}
        onPress={this._rowPressed.bind(this)}>
        <View style={styles.listItemContainer}>
          <Image style={styles.listItemIcon} source={listZoneIcons[rowData.id]} />
          <Text style={styles.listItemTitle}>{rowData.name}</Text>
          <View style={styles.listItemRight}>
            <Image style={styles.listItemRightImage} source={require('../image/mgj.png')}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.listHeadContainer}>
        <View style={styles.searchContainer} >
          <Image source={require('../image/gep.png')} style={styles.searchIcon} />
          <Text style={styles.searchText}>搜索电影/音乐/商品...</Text>
        </View>
        <View style={styles.listHeadBottom}>
          <View style={styles.listHeadBottomItem}>
            <Image source={require('../image/igs.png')} style={styles.listHeadBottomItemIcon} />
            <Text style={styles.listHeadBottomItemText}>好友动态</Text>
          </View>
          <View style={styles.listHeadBottomItem}>
            <Image source={require('../image/eqc.png')} style={styles.listHeadBottomItemIcon} />
            <Text style={styles.listHeadBottomItemText}>附近</Text>
          </View>
          <View style={styles.listHeadBottomItem}>
            <Image source={require('../image/iei.png')} style={styles.listHeadBottomItemIcon} />
            <Text style={styles.listHeadBottomItemText}>兴趣部落</Text>
          </View>
        </View>
      </View>
      );
  }

  _rowPressed(rowData, sectionID, rowID) {
    const { rootNavigator} = this.props;
    rootNavigator.push({
      component: ZoneDetail,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
    });
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
  listHeadContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  listHeadBottom: {
    flexDirection: 'row',
    paddingBottom: Utils.px2dp(55),
    paddingTop: Utils.px2dp(35)
  },
  listHeadBottomItem: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listHeadBottomItemText: {
    color: '#050505',
    fontSize: Utils.fontSize2RN(40),
    marginTop: Utils.px2dp(10)
  },
  listHeadBottomItemIcon: {
    width: Utils.px2dp(120),
    height: Utils.px2dp(120)
  },
  listItemContainer: {
    flex: 1,
    height: Utils.px2dp(140),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: Skin.messageListItemBorderColor,
    borderBottomWidth: Utils.px2dp(1),
    paddingLeft: Utils.px2dp(36),
    paddingRight: Utils.px2dp(36),
  },
  listItemIcon: {
    width: Utils.px2dp(80),
    height: Utils.px2dp(80),
    marginLeft: Utils.px2dp(16),
    marginRight: Utils.px2dp(52)
  },
  listItemTitle: {
    color: Skin.messageListItemTitleColor,
    fontSize: Utils.fontSize2RN(50)
  },
  listItemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  listItemRightImage: {
    width: Utils.px2dp(25),
    height: Utils.px2dp(40),
  },
  headerTitleText: {
    color: Skin.headTitleBtnContentTextColor,
    fontSize: Utils.fontSize2RN(56),
    fontWeight: '200',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Utils.px2dp(140),
    borderColor: '#c3c3c3',
    borderWidth: Utils.px2dp(1),
    paddingLeft: Utils.px2dp(22),
    paddingRight: Utils.px2dp(22)
  },
  sectionTitle: {
    color: Skin.messageListItemTitleColor,
    fontSize: Utils.fontSize2RN(50),
  },
  sectionRight: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  sectionArrowRight: {
    width: Utils.px2dp(80),
    height: Utils.px2dp(80),
    tintColor: '#b3b3b3',
    marginRight: Utils.px2dp(22)
  },
  sectionArrowDown: {
    width: Utils.px2dp(80),
    height: Utils.px2dp(80),
    tintColor: '#b3b3b3',
    marginRight: Utils.px2dp(22),
    transform: [
      {rotate:'90deg'}
    ]
  },
  searchContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Utils.px2dp(37),
    marginRight: Utils.px2dp(37),
    marginTop: Utils.px2dp(20),
    marginBottom: Utils.px2dp(20),
    height: Utils.px2dp(80),
    borderRadius: Utils.px2dp(6),
    backgroundColor: Skin.searchBackgroundColor
  },
  searchIcon: {
    width: Utils.px2dp(42),
    height: Utils.px2dp(42),
    marginRight: Utils.px2dp(13),
    tintColor: Skin.searchIconColor,
  },
  searchText: {
    color: Skin.searchTextColor,
    fontSize: Utils.fontSize2RN(45)
  },
  backgroundImage: {
    flex: 1,
    width: Utils.size.width,
    height: Utils.size.height,
    position: 'absolute',
  }
})

export default connect(state => ({
  zoneDatas: state.app.zoneDatas,
}),
  (dispatch) => ({
    getZoneDatas: () => dispatch(AppActions.getZoneDatas())
  })
)(zone);

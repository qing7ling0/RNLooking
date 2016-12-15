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
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header'
import {Skin} from '../modules/Skin';
import * as Config from '../constants/Config';
import TouchMoveItem from '../components/TouchMoveItem';
import FriendsListItem from '../components/FriendListItem';

class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      groupsExpander:[],
    }
    this.groupsExpander = [];
    this.listRowCaches = {};
    this._rows = {};
    this._rowSectionArrows = {};
  }

  componentDidMount() {
    const {getAllFriends} = this.props;
    getAllFriends();
  }

  render() {
    const { friends, friendGroups } = this.props;

    let friendDatas = [];
    let friendRows = [];
    for(let gInd in friendGroups) {
      if (gInd >= this.state.groupsExpander.length) {
        this.state.groupsExpander.push(true);
        this.groupsExpander.push(true);
      }

      let groups = friendGroups[gInd];
      let data = [];
      let row = [0];
      groups.index = gInd;
      // groups.expander = this.state.groupsExpander[gInd];
      data.groups = groups;
      let items = [];
      for(let fi in groups.friendIDS) {
        for(let fInd in friends) {
          if (friends[fInd].id === groups.friendIDS[fi]) {
            items.push(friends[fInd]);
          }
        }
      }
      data.push(items);
      friendDatas.push(data);
      friendRows.push(row);
    }
    if (friendDatas) {
      let datas = this.ds.cloneWithRowsAndSections(friendDatas, null , friendRows);
      return (
        <View style={styles.container}>
          <Header 
            title={'联系人'} 
            navigator={this.props.navigator}
            renderRightBtn= {this._renderHeaderRightBtn.bind(this)()}
            />
          <View style={styles.flex}>
            <ListView
              dataSource={datas}
              initialListSize={0}
              pageSize={1}
              renderRow={this._renderRow.bind(this)}
              renderSectionHeader={this._renderSection.bind(this)}
              scrollRenderAheadDistance={100}
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
        onPress={() =>{}}>
        <Text style={styles.headerTitleText} >添加</Text>
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

  _renderRowRight(row) {
    return (
      <View style={styles.listItemBottomContainer} >
        <TouchableOpacity style={styles.listItemBottomBtn1} opacity={1}>
          <View style={styles.listItemBottomBtnContainer}>
            <Text style={styles.listItemBottomText}>置顶</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemBottomBtn2} opacity={1}>
          <View style={styles.listItemBottomBtnContainer}>
            <Text style={styles.listItemBottomText}>标记未读</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemBottomBtn3} opacity={1}>
          <View style={styles.listItemBottomBtnContainer}>
            <Text style={styles.listItemBottomText}>删除</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderRowItem(itemData, sectionID, rowID, itemID) {
    return (<TouchableHighlight
      underlayColor= {'#c6dff1'}
      onPress={()=>{}}
      key={sectionID + '-' + rowID + '-' + itemID}>
      <View style={styles.listItemContainer}>
        <Image style={styles.listItemIcon} source={listTestIcons[itemData.icon]} />
        <View style={styles.listItemRight}>
          <View style={styles.listItemTop}>
            <View style={[styles.listItemTop, styles.flex]}>
              <Text style={styles.listItemTitle}>{itemData.name}</Text>
            </View>
          </View>
          <View style={styles.listItemBottom}>
            <View style={[styles.listItemBottom, styles.flex]}>
              <Text style={styles.listItemIntro}>{itemData.signature}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>);
  }

  _renderRow(rowData, sectionID, rowID) {
    if (this.groupsExpander[sectionID]) {
      let rowRef = 'row' + sectionID;
      return (
        <FriendsListItem 
          key={sectionID + '-' + rowID} 
          removeClippedSubviews={true}
          rowData={rowData}
          sectionID={sectionID}
          rowID={rowID}
          expander={true}
          ref={(e) => {
            this._rows[rowRef] = e;
          }}/>
      );
    } else {
      return null;
    }
  }

  _renderSection(sectionData, sectionID) {
    let arrowStyle = this.state.groupsExpander[sectionID] ? styles.sectionArrowDown : styles.sectionArrowRight;
    let arrowRef = 'arrow'+sectionID;
    return (
      <TouchableHighlight
        underlayColor= {'#f4f4f4'}
        style={styles.flex}
        onPress={()=>{
          this._sectionPressed.bind(this)(sectionData, sectionID);
        }}
      >
        <View style={styles.sectionContainer}>
          <Image style={arrowStyle} source={require('../image/hmp.png')} ref={(e)=>{
            this._rowSectionArrows[arrowRef] = e;
          }}/>
          <Text style={styles.sectionTitle}>{sectionData.groups.name}</Text>
          <View style={styles.sectionRight}>
            <Text style={styles.listItemRightText}>2/2</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderHeader() {
    return (
      <View style={styles.listHeadContainer}>
        <View style={styles.searchContainer} >
          <Image source={require('../image/gep.png')} style={styles.searchIcon} />
          <Text style={styles.searchText}>搜索</Text>
        </View>
        <View style={styles.listHeadBottom}>
          <View style={styles.listHeadBottomItem}>
            <Image source={require('../image/qq_contact_list_newfriend_enter_icon_theme_version2.png')} style={styles.listHeadBottomItemIcon} />
            <Text style={styles.listHeadBottomItemText}>新朋友</Text>
          </View>
          <View style={styles.listHeadBottomItem}>
            <Image source={require('../image/qq_contact_list_troop_entry_icon_theme_version2.png')} style={styles.listHeadBottomItemIcon} />
            <Text style={styles.listHeadBottomItemText}>群聊</Text>
          </View>
          <View style={styles.listHeadBottomItem}>
            <Image source={require('../image/qq_contact_list_pbaccount_entry_icon_theme_version2.png')} style={styles.listHeadBottomItemIcon} />
            <Text style={styles.listHeadBottomItemText}>公众号</Text>
          </View>
        </View>
      </View>
      );
  }

  _sectionPressed(sectionData, sectionID) {
    let _groupsExpander = this.groupsExpander;
    let ex = !_groupsExpander[sectionData.groups.index];
    _groupsExpander[sectionData.groups.index] = ex;
    let row = 'row' + sectionID;
    this._rows[row].setState({
      expander: ex
    });

    let arrowRef = 'arrow' + sectionID;
    this._rowSectionArrows[arrowRef].setNativeProps({
      style: ex ? styles.sectionArrowDown : styles.sectionArrowRight
    });
  }

  _rowPressed(rowData, sectionID, rowID) {

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
  listItemGroupContainerExpander:{
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#ff00ff',
    opacity: 1
  },
  listItemGroupContainerUnexpander:{
    opacity : 0
  },
  listItemContainer: {
    flex: 1,
    height: Utils.px2dp(200),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Skin.messageListItemBorderColor,
    borderBottomWidth: Utils.px2dp(1),
    paddingLeft: Utils.px2dp(36),
    paddingRight: Utils.px2dp(36),
  },
  listItemIcon: {
    width: Utils.px2dp(150),
    height: Utils.px2dp(150),
    borderRadius: Utils.px2dp(75),
    marginRight: Utils.px2dp(36)
  },
  listItemRightText: {
    color: Skin.messageListItemDateColor,
    fontSize: Utils.fontSize2RN(40),
    marginBottom: Utils.px2dp(6),
  },
  listItemRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemTop: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemBottom: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemTitle: {
    color: Skin.messageListItemTitleColor,
    fontSize: Utils.fontSize2RN(50),
  },
  listItemIntro: {
    flex: 1,
    color: Skin.messageListItemIntroColor,
    fontSize: Utils.fontSize2RN(40),
  },
  headerTitleText: {
    color: Skin.headTitleBtnContentTextColor,
    fontSize: Utils.fontSize2RN(56),
    fontWeight: '200',
  },
  sectionContainer: {
    flex: 1,
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
    marginRight: Utils.px2dp(22),
    transform: [
      {rotate:'0deg'}
    ]
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Utils.px2dp(37),
    marginRight: Utils.px2dp(37),
    marginTop: Utils.px2dp(20),
    marginBottom: Utils.px2dp(20),
    height: Utils.px2dp(80),
    borderRadius: Utils.px2dp(6),
    backgroundColor:Skin.searchBackgroundColor
  },
  searchIcon: {
    width: Utils.px2dp(42),
    height: Utils.px2dp(42),
    marginRight: Utils.px2dp(13),
    tintColor: Skin.searchIconColor,
  },
  searchText: {
    color:Skin.searchTextColor,
    fontSize:Utils.fontSize2RN(45)
  },
  backgroundImage: {
    flex: 1,
    width: Utils.size.width,
    height: Utils.size.height,
    position: 'absolute',
  }
})

export default connect(state => ({
  friends: state.app.friends,
  friendGroups: state.app.friendGroups
}),
  (dispatch) => ({
    getAllFriends: () => dispatch(AppActions.getAllFriends())
  })
)(FriendsList);

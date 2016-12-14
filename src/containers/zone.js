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
import * as appActions from '../actions/appActions'
import { connect } from 'react-redux'
import utils from '../utils/utils'
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header'
import {skin} from '../modules/skin';
import * as config from '../constants/config';
import TouchMoveItem from '../components/TouchMoveItem'

const listTestIcons = [
  require('../image/head/1.bmp'),
  require('../image/head/2.bmp'),
  require('../image/head/3.bmp'),
  require('../image/head/4.bmp'),
  require('../image/head/5.bmp'),
  require('../image/head/6.bmp'),
  require('../image/head/7.bmp'),
  require('../image/head/8.bmp'),
  require('../image/head/9.bmp'),
  require('../image/head/10.bmp'),
  require('../image/head/11.bmp'),
  require('../image/head/12.bmp'),
  require('../image/head/13.bmp'),
  require('../image/head/14.bmp'),
  require('../image/head/15.bmp'),
  require('../image/head/16.bmp'),
]

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
      }

      let groups = friendGroups[gInd];
      let data = [];
      let row = [];
      let index = 0;
      groups.index = gInd;
      data.groups = groups;
      for(let fi in groups.friendIDS) {
        for(let fInd in friends) {
          if (friends[fInd].id === groups.friendIDS[fi]) {
            data.push(friends[fInd]);
            row.push(index);
            index ++;
          }
        }
      }
      friendDatas.push(data);
      friendRows.push(row);
    }
    if (friendDatas) {
      let datas = this.ds.cloneWithRowsAndSections(friendDatas, null , friendRows);
      return (
        <View style={styles.container}>
          <Header 
            title={'动态'} 
            navigator={this.props.navigator}
            renderRightBtn= {this._renderHeaderRightBtn.bind(this)()}
            />
          <View style={styles.flex}>
            <View>
              <Image style={styles.backgroundImage} source={require('../image/bg.png') }></Image>

            </View>
            <ListView
              dataSource={datas}
              initialListSize={0}
              pageSize={2}
              renderRow={this._renderRow.bind(this)}
              renderSectionHeader={this._renderSection.bind(this)}
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
        <Text style={styles.headerTitleText} >更多</Text>
      </TouchableOpacity>
    );
  }

  _headOptionCallback(type) {
    switch(type) {
      case config.HEAD_OPTION_TYPE.TYPE_SHOW_MORE_MENU:
      {
        const {showMoreMenu} = this.props;
        showMoreMenu(this._renderMoreMenu.bind(this));
      }
      break;
      case config.HEAD_OPTION_TYPE.TYPE_SHOW_MESSAGE_LIST:
      break;
      case config.HEAD_OPTION_TYPE.TYPE_SHOW_USER_INFO:
      break;
      case config.HEAD_OPTION_TYPE.TYPE_SHOW_PHONE_LIST:
      break;
      case config.HEAD_OPTION_TYPE.TYPE_SHOW_MORE_ZONE:
      break;
      case config.HEAD_OPTION_TYPE.TYPE_SHOW_ADD_FRIEND_VIEW:
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

  _renderRow(rowData, sectionID, rowId) {
    if (this.state.groupsExpander[sectionID]) {
      return (
        <TouchableHighlight
          underlayColor= {'#c6dff1'}
          onPress={()=>{}}
          style={{
            flex: 1,
            height: utils.px2dp(200),
            borderColor: '#c3c3c3',
            borderWidth: utils.px2dp(1),
          }}>
          <View style={styles.listItemContainer}>
            <Image style={styles.listItemIcon} source={listTestIcons[rowData.icon]} />
            <View style={styles.listItemRight}>
              <View style={styles.listItemTop}>
                <View style={[styles.listItemTop, styles.flex]}>
                  <Text style={styles.listItemTitle}>{rowData.name}</Text>
                </View>
              </View>
              <View style={styles.listItemBottom}>
                <View style={[styles.listItemBottom, styles.flex]}>
                  <Text style={styles.listItemIntro}>{rowData.signature}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (null);
    }
  }

  _renderSection(sectionData, sectionID) {
    let arrowStyle = this.state.groupsExpander[sectionID] ? styles.sectionArrowDown : styles.sectionArrowRight;
    return (
      <TouchableHighlight
        underlayColor= {'#f4f4f4'}
        onPress={()=>{
          this._sectionPressed.bind(this)(sectionData, sectionID);
        }}
      >
        <View style={styles.sectionContainer}>
          <Image style={arrowStyle} source={require('../image/hmp.png')} />
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

  _sectionPressed(sectionData, sectionID) {
    let _groupsExpander = this.state.groupsExpander;
    _groupsExpander[sectionData.groups.index] = !_groupsExpander[sectionData.groups.index];
    this.setState({
      groupsExpander: _groupsExpander,
    });
  }

  _rowPressed(rowData, sectionID, rowID) {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skin.bodyBackgroundColor
  },
  flex: {
    flex: 1
  },
  listHeadContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  listHeadBottom: {
    flex:1,
    flexDirection: 'row',
    paddingBottom: utils.px2dp(55),
    paddingTop: utils.px2dp(35)
  },
  listHeadBottomItem: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listHeadBottomItemText: {
    color: '#050505',
    fontSize: utils.fontSize2RN(40),
    marginTop: utils.px2dp(10)
  },
  listHeadBottomItemIcon: {
    width: utils.px2dp(120),
    height: utils.px2dp(120)
  },
  listItemContainer: {
    flex: 1,
    height: utils.px2dp(200),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: skin.messageListItemBorderColor,
    borderBottomWidth: utils.px2dp(1),
    paddingLeft: utils.px2dp(36),
    paddingRight: utils.px2dp(36),
  },
  listItemIcon: {
    width: utils.px2dp(150),
    height: utils.px2dp(150),
    borderRadius: utils.px2dp(75),
    marginRight: utils.px2dp(36)
  },
  listItemRightText: {
    color: skin.messageListItemDateColor,
    fontSize: utils.fontSize2RN(40),
    marginBottom: utils.px2dp(6),
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
    color: skin.messageListItemTitleColor,
    fontSize: utils.fontSize2RN(50),
  },
  listItemIntro: {
    flex: 1,
    color: skin.messageListItemIntroColor,
    fontSize: utils.fontSize2RN(40),
  },
  headerTitleText: {
    color: skin.headTitleBtnContentTextColor,
    fontSize: utils.fontSize2RN(56),
    fontWeight: '200',
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: utils.px2dp(140),
    borderColor: '#c3c3c3',
    borderWidth: utils.px2dp(1),
    paddingLeft: utils.px2dp(22),
    paddingRight: utils.px2dp(22)
  },
  sectionTitle: {
    color: skin.messageListItemTitleColor,
    fontSize: utils.fontSize2RN(50),
  },
  sectionRight: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  sectionArrowRight: {
    width: utils.px2dp(80),
    height: utils.px2dp(80),
    tintColor: '#b3b3b3',
    marginRight: utils.px2dp(22)
  },
  sectionArrowDown: {
    width: utils.px2dp(80),
    height: utils.px2dp(80),
    tintColor: '#b3b3b3',
    marginRight: utils.px2dp(22),
    transform: [
      {rotate:'90deg'}
    ]
  },
  searchContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: utils.px2dp(37),
    marginRight: utils.px2dp(37),
    marginTop: utils.px2dp(20),
    marginBottom: utils.px2dp(20),
    height: utils.px2dp(80),
    borderRadius: utils.px2dp(6),
    backgroundColor:skin.searchBackgroundColor
  },
  searchIcon: {
    width: utils.px2dp(42),
    height: utils.px2dp(42),
    marginRight: utils.px2dp(13),
    tintColor: skin.searchIconColor,
  },
  searchText: {
    color:skin.searchTextColor,
    fontSize:utils.fontSize2RN(45)
  },
  backgroundImage: {
    flex: 1,
    width: utils.size.width,
    height: utils.size.height,
    position: 'absolute',
  }
})

export default connect(state => ({
  friends: state.app.friends,
  friendGroups: state.app.friendGroups
}),
  (dispatch) => ({
    getAllFriends: () => dispatch(appActions.getAllFriends())
  })
)(zone);

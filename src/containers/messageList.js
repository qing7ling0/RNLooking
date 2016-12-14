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

const moreMenuDatas = [
  {index:0, image:require('../image/conversation_options_multichat.png'), title:'发起多人聊天'},
  {index:1, image:require('../image/conversation_options_addmember.png'), title:'加好友'},
  {index:2, image:require('../image/conversation_options_qr.png'), title:'扫一扫'},
  {index:3, image:require('../image/conversation_facetoface_qr.png'), title:'面对面快传'},
  {index:4, image:require('../image/conversation_options_charge_icon.png'), title:'付款'},
]

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

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  componentDidMount() {
    const {getUsers, page, pageCount} = this.props;
    getUsers(page, pageCount);
    //检查是否已经填写用户信息
    AsyncStorage.getItem('author', (err, data) => {
      if (!data) {
        // Alert.alert('登陆', '👽来者何人！👽', [{ text: '确定', onPress: this._saveAuthor }])
      }else{
        utils.author=data
      }
    })
  }

  render() {
    const { dataList, refreshing } = this.props;
    if (dataList) {
      let datas = this.ds.cloneWithRows(dataList);
      return (
        <View style={styles.container}>
          <Header
            navigator={this.props.navigator}
            optionCallback={this._headOptionCallback.bind(this)}
            />
          <View style={styles.flex}>
            <View>
              <Image style={styles.backgroundImage} source={require('../image/bg.png') }></Image>
            </View>
            <ListView
              dataSource={datas}
              initialListSize={0}
              pageSize={2}
              renderRow={this._renderRow.bind(this) }
              enableEmptySections={true}
              onEndReached={this._nextPage.bind(this) }
              onEndReachedThreshold={200}
              renderHeader ={this._renderHeader.bind(this) }
              renderFooter={this._renderFooter.bind(this) }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this._onRefresh.bind(this) }
                  tintColor="#000"
                  title="加载中..."
                  titleColor="#000"
                  colors={['#333333', '#aaaaaa', '#eeeeee']}
                  progressBackgroundColor="#f2f2f2"
                  />}
              />
          </View>
        </View>
      );
    } else {
      return (null);
    }
  }

  _renderMoreMenuRow(row) {
    let borderStyle = {};
    if (row.index === 0) borderStyle = styles.moreMenuTop;
    if (row.index === moreMenuDatas.length-1) borderStyle = styles.moreMenuBottom;
    return (
      <TouchableHighlight style={[styles.moreMenuItem, borderStyle]}
        underlayColor= {'#f2f2f2'}
        onPress={()=>{
          this.props.hideMoreMenu();
        }}
      >
        <View style={styles.moreMenuItemInnerContainer}>
          <Image style={styles.moreMenuItemImage} source={row.image} />
          <Text style={styles.moreMenuItemText}>{row.title}</Text>
        </View>
      </TouchableHighlight>);
  }

  _renderMoreMenu() {
    let datas = this.ds.cloneWithRows(moreMenuDatas);  
    return (
      <View style={styles.moreMenuContainer}>
        <ListView
          style={styles.scrollView}
          dataSource={datas}
          renderRow={this._renderMoreMenuRow.bind(this) }
          />
      </View>
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


  _renderRowContent(row) {
    return (
      <View style={styles.listItemContainer}>
        <Image style={styles.listItemIcon} source={listTestIcons[row.icon]} />
        <View style={styles.listItemRight}>
          <View style={styles.listItemTop}>
            <View style={[styles.listItemTop, styles.flex]}>
              <Text style={styles.listItemTitle}>{row.name}</Text>
              <Text style={styles.listItemDate}>{row.lastChatMessageDate}</Text>
            </View>
          </View>
          <View style={styles.listItemBottom}>
            <View style={[styles.listItemBottom, styles.flex]}>
              <Text style={styles.listItemIntro}>{row.lastChatMessage}</Text>
              {
                row.unreadMessageCount > 0?
                <View style={styles.listItemTipContainer}>
                  <Text style={styles.listItemTipText}>{row.unreadMessageCount}</Text>
                </View>
                : null
              }
            </View>
          </View>
        </View>
      </View>
    );
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

  _renderRow(row) {

    return (
      <View style={{
        flex: 1,
        height: utils.px2dp(200),
        borderColor: '#c3c3c3',
        borderWidth: utils.px2dp(1),
      }}>
        <TouchMoveItem
          renderContent={this._renderRowContent.bind(this)(row)}
          renderRight={this._renderRowRight.bind(this)(row)}
         />
      </View>
    )
  }

  _saveAuthor(author) {
    AsyncStorage.setItem('author', author)
    utils.author=author
  }

  _renderFooter() {
    if (this.props.fetchingNext) {
      return (
      <ActivityIndicator
        animating = {this.props.fetchingNext}
        style = {{ height: 40 }}
        size = "large"/>
      )  
    } else {     
      return null;
    }
  }

  _renderHeader() {
    return (
      <View style={styles.searchContainer} >
        <Image source={require('../image/gep.png')} style={styles.searchIcon} />
        <Text style={styles.searchText}>搜索</Text>
      </View>
      );
  }

  _toDetail(id) {
    this.props.navigator.push({
      component: PostDetail,
      passProps: {
        itemId: id,
        title: '详情',
      }
    })
  }

  _onRefresh() {
    const {getUsers, page, pageCount} = this.props;
    getUsers(1, pageCount);
  }

  _nextPage() {
    const {getUsers, page, pageCount} = this.props;
    if (page > 10) return;
    getUsers(page+1, pageCount);
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
  moreMenuContainer: {
    position: 'absolute',
    right: utils.px2dp(16),
    top: utils.px2dp(26+152),
    width: utils.px2dp(480),
    borderRadius: utils.px2dp(12),
    backgroundColor: skin.bodyBackgroundColor
  },
  moreMenuItem: {
    height: utils.px2dp(130),
  },
  moreMenuItemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreMenuTop: {
    borderTopRightRadius: utils.px2dp(12),
    borderTopLeftRadius: utils.px2dp(12),
  },
  moreMenuBottom: {
    borderBottomRightRadius: utils.px2dp(12),
    borderBottomLeftRadius: utils.px2dp(12),
  },
  moreMenuItemText: {
    color: '#000000',
    fontSize: utils.fontSize2RN(50),
  },
  moreMenuItemImage: {
    width: utils.px2dp(80),
    height: utils.px2dp(80),
    marginLeft: utils.px2dp(30),
    marginRight: utils.px2dp(30),
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
  listItemDate: {
    color: skin.messageListItemDateColor,
    fontSize: utils.fontSize2RN(30),
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
  listItemTipContainer: {
    width: utils.px2dp(60),
    height: utils.px2dp(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skin.messageListItemTipBackgroundColor,
    borderRadius: utils.px2dp(30),
    marginRight: utils.px2dp(10)
  },
  listItemTipText: {
    color: skin.messageListItemTipTextColor,
    borderRadius: utils.px2dp(15),
    fontSize: utils.fontSize2RN(30),
  },
  listItemBottomContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  listItemBottomBtnContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    minWidth: utils.px2dp(250),
  },
  listItemBottomBtn1: {
    flex:1,
    backgroundColor: skin.messageListItemRightBtnColor1,
  },
  listItemBottomBtn2: {
    flex:1,
    backgroundColor: skin.messageListItemRightBtnColor2,
  },
  listItemBottomBtn3: {
    flex:1,
    backgroundColor: skin.messageListItemRightBtnColor3,
  },
  listItemBottomText: {
    color: skin.messageListItemRightTextColor,
    fontSize: utils.fontSize2RN(56),
    marginLeft: utils.px2dp(50),
    marginRight: utils.px2dp(50)
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
  dataList: state.app.users,
  fetchingNext: state.app.fetchingNext || false,
  refreshing: state.app.refreshing || false,
  page: state.app.page,
  pageCount: state.app.pageCount,
  isMoreMenuShow: state.app.maskRender || false
}),
  (dispatch) => ({
    getUsers: (page, pageCount) => dispatch(appActions.getUsers(page, pageCount)),
    showMoreMenu: (moreMenuRender) => dispatch(appActions.showMoreMenu(moreMenuRender)),
    hideMoreMenu: () => dispatch(appActions.hideMoreMenu())
  })
)(MessageList);

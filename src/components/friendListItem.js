'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native'

import {Skin} from '../modules/Skin'
import Utils from '../utils/Utils'
import * as Config from '../constants/Config'
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
];

export default class FriendsListItem extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      expander: true
    };
    this.rowCaches = null;
    this.rowView = null;
  }

  render() {
    let {rowData, sectionID, rowID} = this.props;
    let items = null;
    if (this.rowCaches === null) {
      this.rowCaches = [];
      for(let itemID in rowData) {
        let item = this._renderRowItem.bind(this)(rowData[itemID], sectionID, rowID, itemID);
        this.rowCaches.push(item);
      }
    }

    let viewStyle = this.state.expander ? styles.listItemGroupContainerExpander : styles.listItemGroupContainerUnexpander;
    return (
      <View 
        key={sectionID + '-' + rowID} 
        removeClippedSubviews={true}
        style={viewStyle}>
        {this.rowCaches}
      </View>
    );
  }

  _renderRowItem(itemData, sectionID, rowID, itemID) {
    return (<TouchableHighlight
      underlayColor= {'#c6dff1'}
      onPress={()=>{}}
      style={styles.container}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin.bodyBackgroundColor
  },
  flex: {
    flex: 1
  },
  listItemGroupContainerExpander:{
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden'
  },
  listItemGroupContainerUnexpander:{
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    height : 0
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
  }
})
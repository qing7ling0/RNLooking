'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native'

import {skin} from '../modules/skin'
import utils from '../utils/utils'
import * as config from '../constants/config'
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
    let {rowData, sectionID, rowID, expander} = this.props;
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
    backgroundColor: skin.bodyBackgroundColor
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
    height : 0
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
  }
})
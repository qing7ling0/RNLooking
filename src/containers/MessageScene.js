import React from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    Navigator,
    ListView, 
    Image
} from 'react-native';

import BaseScene from '../components/BaseScene'
import ContentComponent from '../components/ContentComponent'
import NineReactangle from '../components/NineRectangle'
import Utils from '../utils/Utils'

const HEAD_ICON = [
  require('../image/head/1.bmp')
]

class MessageScene extends BaseScene {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (row1, row2) => row1 !== row2
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <ContentComponent title={this.props.name} backTitle={'返回'} renderContent={this._renderContent.bind(this)} backPressed={this.componentBack} />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {

    return (
      <View style={styles.listItemContainer}>
        <Image source={HEAD_ICON[0]} />
        <View>
          <Text>{rowData.name}</Text>
          <NineReactangle image={require('../image/acq.9.png')} rect={{left:Utils.px2dp(30), top:Utils.px2dp(80), bottom:Utils.px2dp(100), right:Utils.px2dp(50)}}>
            <Text>{rowData.message}</Text>
          </NineReactangle>
        </View>
      </View>
    );
  }

  _renderContent() {
    let sourceDatas =[
      {id:1, name:'大张伟', message:'我是测试的我是测试的我是测试的我是测试的我是测试的我是测试撑死我塑料袋垃圾堆了解法兰姬诶卡拉斯的放假啦大家flak圣诞节fl', data: 1110009},
      {id:1, name:'大张伟', message:'我是测试的我是测试的我是测试的我是测试的我是测试的我是测试撑死我塑料袋垃圾堆了解法兰姬诶卡拉斯的放假啦大家flak圣诞节fl', data: 1110009},
      {id:1, name:'大张伟', message:'我是测试的我是测试的我是测试的我是测试的我是测试的我是测试撑死我塑料袋垃圾堆了解法兰姬诶卡拉斯的放假啦大家flak圣诞节fl', data: 1110009},
      {id:1, name:'大张伟', message:'我是测试的我是测试的我是测试的我是测试的我是测试的我是测试撑死我塑料袋垃圾堆了解法兰姬诶卡拉斯的放假啦大家flak圣诞节fl', data: 1110009},
      {id:1, name:'大张伟', message:'我是测试的我是测试的我是测试的我是测试的我是测试的我是测试撑死我塑料袋垃圾堆了解法兰姬诶卡拉斯的放假啦大家flak圣诞节fl', data: 1110009},
    ]
    let datas = this.ds.cloneWithRows(sourceDatas);
    return (
        <View style={styles.content}>
          <ListView
            dataSource={datas}
            initialListSize={0}
            pageSize={1}
            renderRow={this._renderRow.bind(this)}
            scrollRenderAheadDistance={100}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex:1
  }
});

module.exports = MessageScene;
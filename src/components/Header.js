import React, {Component} from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  PixelRatio
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Skin} from '../modules/Skin';
import Utils from '../utils/Utils';
import * as Config from '../constants/Config.js';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userListStates: {
        messageSelected: true,
        phoneSelected: false
      }
    }
  }

  render() {
    const { title, renderRightBtn, rightBtnPress, showBackBtn, user, renderLeftBtn} = this.props;
    let titleButton = this._renderTitleButton.bind(this);
    let des = PixelRatio.get();
    let cusRightBtn = this._renderRight.bind(this);
    let titleRender = this._renderTitle.bind(this);

    let left = null;
    if (renderLeftBtn) {
      left = renderLeftBtn();
    } else {
      let headIcon = this._renderHeadIcon.bind(this);
      left = headIcon();
    }

    return (
      <View style={styles.container}>
        {left}
        {title ? titleRender(title) : titleButton()}
        <View style={styles.rightBtn}>
          {renderRightBtn ? renderRightBtn : cusRightBtn()}
        </View>
      </View>
    );
  }

  _renderTitle(title) {
    return (
        <Text style={styles.title} >{title}</Text>
      );
  }

  _renderRight(rightBtnPress) {
    return (
        <TouchableOpacity 
          onPress={ rightBtnPress ? rightBtnPress : this._rightBtnPress.bind(this) }>
          <Text style={{color:Skin.headTitleBtnBackgroundColor, fontSize:Utils.fontSize2RN(100)}} >+</Text>
        </TouchableOpacity>
      );
  }

  _rightBtnPress() {
    const { optionCallback } = this.props;
    if(optionCallback) optionCallback(Config.HEAD_OPTION_TYPE.TYPE_SHOW_MORE_MENU);
  }

  _renderHeadIcon() {
    return (
      <TouchableOpacity style={styles.head} onPress={this._pop.bind(this) }>
        <Image style={styles.headImage} source={require('../image/head/1.bmp')} />
      </TouchableOpacity>);
  }

  _renderTitleButton() {
    let styleMsgText = this.state.userListStates.messageSelected ? styles.titleBtnContentTextActive : {};
    let styleMsgBg = this.state.userListStates.messageSelected ? styles.titleBtnContentActive : {};
    let stylePhoneText = this.state.userListStates.phoneSelected ? styles.titleBtnContentTextActive : {};
    let stylePhoneBg = this.state.userListStates.phoneSelected ? styles.titleBtnContentActive : {};
    return (
      <View style={styles.titleBtnContainer}>

        <TouchableHighlight 
          style={[styles.titleBtnContent, styles.titleBtnContentLeft, styleMsgBg]}
          activeOpacity={1}
          underlayColor= {Skin.headTitleBtnContentBackgroundColorActive}
          onShowUnderlay= {()=>{ this._titleButtonSelectMessage.bind(this)(true); }}
          onHideUnderlay= {()=>{ this._titleButtonSelectMessage.bind(this)(false); }}
          onPress={this._titleButtonMessagePress.bind(this) }>

            <Text style={[styles.titleBtnContentText, styleMsgText]}>消息</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={[styles.titleBtnContent, styles.titleBtnContentRight, stylePhoneBg]} 
          activeOpacity={1}
          underlayColor= {Skin.headTitleBtnContentBackgroundColorActive}
          onShowUnderlay= {()=>{ this._titleButtonSelectPhone.bind(this)(true); }}
          onHideUnderlay= {()=>{ this._titleButtonSelectPhone.bind(this)(false); }}
          onPress={this._titleButtonPhonePress.bind(this) }>

            <Text style={[styles.titleBtnContentText, stylePhoneText]}>电话</Text>
        </TouchableHighlight>
      </View>);
  }

  _titleButtonSelectMessage(selected) {
    let userListStates = this.state.userListStates;
    userListStates.messageSelected = selected || this.props.isUserListStateMessage;
    // userListStates.phoneSelected = !selected;
    this.setState({
      userListStates: userListStates,
    });
  }

  _titleButtonSelectPhone(selected) {
    let userListStates = this.state.userListStates;
    userListStates.phoneSelected = selected || !this.props.isUserListStateMessage;
    // userListStates.messageSelected = !selected;
    this.setState({
      userListStates: userListStates,
    });
  }

  _titleButtonMessagePress() {
    const { optionCallback } = this.props;
    if(optionCallback) optionCallback(Config.HEAD_OPTION_TYPE.TYPE_SHOW_MESSAGE_LIST);
  }

  _titleButtonPhonePress() {
    const { optionCallback } = this.props;
    if(optionCallback) optionCallback(Config.HEAD_OPTION_TYPE.TYPE_SHOW_MESSAGE_LIST);
  }

  _pop() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Utils.px2dp(152),
    alignItems: 'center',
    backgroundColor: Skin.headBackgroundColor
  },
  head: {
    marginLeft:Utils.px2dp(30)
  },
  headImage: {
    width: Utils.px2dp(112),
    height: Utils.px2dp(112),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e3e3e3'
  },
  titleBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Utils.px2dp(360),
    height: Utils.px2dp(92),
    borderWidth: 1,
    borderRadius: Utils.px2dp(6),
    borderColor: Skin.headTitleBtnBackgroundColor,
    backgroundColor: Skin.headTitleBtnBackgroundColor,
  },
  titleBtnContent: {
    justifyContent: 'center',
    width: Utils.px2dp(175),
    height: Utils.px2dp(84),
    borderRadius: Utils.px2dp(6),
    backgroundColor: Skin.headTitleBtnContentBackgroundColor,
  },
  titleBtnContentLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleBtnContentRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  titleBtnContentActive: {
    backgroundColor: Skin.headTitleBtnContentBackgroundColorActive,
  },
  titleBtnContentText: {
    alignSelf: 'center',
    color: Skin.headTitleBtnContentTextColor
  },
  titleBtnContentTextActive: {
    color: Skin.headTitleBtnContentTextColorActive
  },
  title: {
    color: Skin.headTitleBtnContentTextColor,
    fontSize: Utils.fontSize2RN(56),
    fontWeight: '200',
  },
  line: {
    height: 1,
    backgroundColor: '#afb0b2'
  },
  leftBtn: {
    marginLeft: 10,
    width: 60
  },
  rightBtn: {
    marginRight: 10,
    width: 60,
    alignItems: 'flex-end'
  }
});


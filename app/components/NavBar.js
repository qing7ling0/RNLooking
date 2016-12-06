import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  Text
} from 'react-native';

import NavigationBar from 'react-native-navbar';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.navigator = this.props.navigator;
        this.title = '设置';
        this.state = {
          barHide: false
        }
        console.log('LLComponent constructor');
    }

    back() {
        this.navigator.pop();
    }

    renderContent = () => {
      return null;
    }

    render() {
      let centerView = this.renderContent();

      var rightButtonConfig = {
        title: 'Next1',
        handler: () => {
          // alert('hello!');
          this.setState({
             barHide: true,
           });
        }
      };

      var lefttButtonConfig = {
        title: '<',
        handler:() => {
          // alert('hello!');
          this.setState({
             barHide: false,
           });
        }
      };

      var titleConfig = {
        title: 'Hello, world',
      };
      return (
        <View style={styles.nav}>
          <View style={styles.navTop}>
            <NavigationBar
              title={titleConfig}
              rightButton={rightButtonConfig} 
              leftButton={lefttButtonConfig}
              statusBar={{
                style:'light-content',
                hidden: false,
                tintColor :'#ff00ff',
                hideAnimation:'fade',
                showAnimation:'slide'}}
              />
          </View>
          <View style={styles.navCenter}>{centerView}</View>
          <View style={styles.navBottom}></View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  nav: {
    flex: 960,
    flexDirection: 'column',
  },
  navTop: {
    flex: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3'
  },
  navCenter: {
    flex: 720
  },
  navBottom:{
    flex: 120,
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3'
  },
  title: {
    alignSelf: 'flex-end',
    marginBottom: 3,
    marginLeft: 10,
    color: '#333333',
    fontSize: 30,
  }
});

module.exports = NavBar;
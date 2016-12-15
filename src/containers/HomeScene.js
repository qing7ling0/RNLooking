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

import NavBar from '../components/NavBar'
import Swiper from 'react-native-swiper'

class HomePage extends NavBar {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  renderRow (rowData) {
    return (
      <Text
        style={{
          flex: 1,
        }}>
        {rowData}
      </Text>
    );
  }

  renderContent = () => {
    return(
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Swiper style={styles.wrapper}
          height={120} 
          showsPagination={true}
          title={"aaa"}
          bounces={true}
          >
          <View style={styles.slide1}>
            <Image style={styles.image}
              resizeMode={Image.resizeMode.cover}
              source={require('../image/yutong1.jpg')} />
          </View>
          <View style={styles.slide2}>
            <Image style={styles.image}
              resizeMode={Image.resizeMode.stretch}
              source={require('../image/yutong2.jpg')} />
          </View>
          <View style={styles.slide3}>
            <Image style={styles.image} 
              resizeMode={Image.resizeMode.stretch}
              source={require('../image/yutong3.jpg')} />
          </View>
        </Swiper>
        <ListView style={styles.wrapper} 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}/>
      </View>
    );
  }
  
  componentDidMount() {
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 20
  },
  slide1: {
  },
  slide2: {
  },
  slide3: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {

  }
});

module.exports = HomePage;
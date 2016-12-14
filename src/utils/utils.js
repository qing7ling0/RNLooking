var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio,
  ActivityIndicatorIOS
  } = React;

var pixel = 1 / PixelRatio.get();

module.exports = {
  /*最小线宽*/
  pixel: pixel,

  dp2px: (dp) => { return dp / pixel; },

  px2dp: (px) => { return px * pixel; },

  fontSize2RN: (size) => { return size / PixelRatio.getFontScale(); },

  randomInt: (n) => {return Math.floor(Math.random()*n)},

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  author:'rong',
  domain:'http://suzydemo.duapp.com'
}
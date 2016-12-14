import * as skins from '../constants/skins';

var _skin = skins.DEFAULT_SKIN;

var setSkin = (__skin) => {
  _skin = __skin;
}

module.exports = {
  skin: _skin,
  setSkin: setSkin,
};
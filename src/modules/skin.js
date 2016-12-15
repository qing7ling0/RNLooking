import * as Skins from '../constants/Skins';

var _skin = Skins.DEFAULT_SKIN;

var setSkin = (__skin) => {
  _skin = __skin;
}

module.exports = {
  Skin: _skin,
  setSkin: setSkin,
};
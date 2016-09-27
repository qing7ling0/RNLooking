var login = {};

var userData = require('../data/UserData');
var Packet = require('../data/Packet')

login.resLogin = function (res, result) {
    let p = new Packet.ResPacket(result);
    res.json(p.toJsonString());
}

login.reqLogin = function(req, res, next) {
    var p = new Packet.ReqPacket(req);
    userData.login(p.getValue('account'), p.getValue('password'), function(result){
        login.resLogin(res, result);
    });
}

login.resRegister = function (res, result) {
    let p = new Packet.ResPacket(result);
    res.json(p.toJsonString());
}

login.reqRegister = function(req, res, next) {
    var p = new Packet.ReqPacket(req);
    userData.register(p.getValue('account'), p.getValue('password'), function(result){
        login.resRegister(res, result);
    });
}

module.exports = login;
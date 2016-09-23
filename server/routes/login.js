var login = {};

var userData = require('../data/UserData');
var Packet = require('../data/Packet')

login.resLogin = function (res, err, result) {
    let p = new Packet.ResPacket(err, res);
    p.data = result;
    res.json(p.toJsonString());
}

login.reqLogin = function(req, res, next) {
    var p = new Packet.ReqPacket(req);
    userData.login(p.reqData.account, p.reqData.password, function(err, result){
        resLogin(res, err, result);
    });
}

login.resRegister = function (res, err, result) {
    let p = new Packet.ResPacket();
    p.data = result;
    res.json(p.toJsonString());
}

login.reqRegister = function(req, res, next) {
    var p = new Packet.ReqPacket(req);
    userData.register(p.reqData.account, p.reqData.password, function(err, result){
        resRegister(res, err, result);
    });
}

module.exports = login;

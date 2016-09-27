var express = require('express');
var router = express.Router();

var users = require('../data/UserData');
var Packet = require('../data/Packet')

var login = require('./login');

var resGetUsers = function (res, err, result) {
	let p = new Packet.ResPacket();
	p.data = result;
	res.json(p.toJsonString());
}

var reqGetUsers = function(req, res, next) {
    gLog.debug('reqGetUsers req=' + JSON.stringify(req.params));
    users.getAllUser(function(err, result){
    	resGetUsers(res, err, result);
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	reqGetUsers(req, res, next);
});

router.get('/login', function(req, res, next) {
    login.reqLogin(req, res, next);
});

router.get('/register', function(req, res, next) {
    login.reqRegister(req, res, next);
});


module.exports = router;

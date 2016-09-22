var express = require('express');
var router = express.Router();

var users = require('../data/user');
var Packet = require('../data/Packet')

var resGetUsers = function (res, err, result) {
	let p = new Packet.ResPacket();
	p.data = result;
	res.json(p.toJsonString());
}

var reqGetUsers = function(req, res, next) {
  users.getAllUser(function(err, result){
  	resGetUsers(res, err, result);
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	reqGetUsers(req, res, next);
});

module.exports = router;

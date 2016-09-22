var express = require('express');
var router = express.Router();

var userss = require('../modules/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userss.GetUser();
  res.send('respond with a resource');
});

module.exports = router;

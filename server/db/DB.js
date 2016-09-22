
var conf = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'rnlookingdb'
};

var mysql = require('mysql');
var log = require('../utils/log');

var instance = null;

var getConnection = function(pool, callback) {
    if (pool == null)
    {
        log.err('get connection pool is null !');
    }
    else
    {
        if(!callback){
            callback=function(){};
        }
        pool.getConnection(function(err, connection) {
            if (err) {
                log.err('get connection pool error:' + err);
                throw err;
            }
            callback(connection);
        });
    }
};

//  type: [insert, select, delete]
//  property: 属性字段
//  table: 表名
//
//
var jsonData2SQL = function(data){

}

function DB() {
    this.pool = mysql.createPool(conf);
};

DB.prototype.queryWithSql(sql, callback) {
    getConnection(function(connection) {
        var query = connection.query(sql, function(err, result) {
            if (err) {
                callback(err, result);
            } else {
                callback(null, result);
            }
            connection.release(); //release
        });
        log.debug(query.sql);
    });
}

DB.prototype.req(data, callback) {
    getConnection(function(connection) {
        var query = connection.query(sql, function(err, result) {
            if (err) {
                callback(err, result);
            } else {
                callback(null, result);
            }
            connection.release(); //release
        });
        log.debug(query.sql);
    });
}

exports.Instance = function() {
  if (instance == null) {
    instance = new DB();
  }
  return instance;
};
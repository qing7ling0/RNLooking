
var conf = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'rnlookingdb'
};

var status = {
    success                     : 0,
    err_error                   : -1,
    err_account_exist           : -2,
    err_account_pd_null         : -3,
    err_no_permission           : -4
}

var mysql = require('mysql');
var log = require('../utils/log');
var async = require('async');

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

function DB() {
    this.pool = mysql.createPool(conf);
};

DB.prototype.status = status;

//检查表字段
DB.prototype.checkVaildField=function(field){

    if (field && Object.prototype.toString.call(field) === '[object string]')
    {
        let reg = '/^[a-zA-Z][a-zA-Z0-9]*/';
        let ret = field.match(reg);
        if (ret !== null) return true; 
    }

    return false;
}

DB.prototype.escape = function(str) {
    return this.pool.escape(str);
}

DB.prototype.executeSql = function(sql, params, callback) {
    if(!callback) {
        callback = function(){};
    }
    if (params) {
        for (var i=0; i<params.length; i++) {
            sql=sql.replace("?",this.escape(params[i])) ;
        }
    }
    getConnection(this.pool, function(connection) {
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

DB.prototype.executeTransaction = function (transaction) {
    getConnection(this.pool, function(connection) {
        var calls = [];
        for (var i = 0; i < transaction.data.length; i++) {
            var tr = transaction.data[i];
            calls.push(function(callback) {
                connection.executeSql(tr.sql, function(err, result)
                {
                    tr.callback(err, result);
                    callback(err, result);
                });
            });
        }

        async.series(calls, function(err, results){  
  
            if (err) {  
                gLog.error("rolexecuteTransaction error " + err);  
                connection.rollback(function() {  
                    throw err;  
                });   
            } else {
                connection.commit(function(err) {  
                    if (err) {   
                        connection.rollback(function() {  throw err; });  
                    }  
                });
            }
        }); 
    });
}

//clear表字段
DB.prototype.clearNotExistField=function(values){
    if(values && this.fields){
        for(var prop in values){
            if(prop !==null && checkVaildField(prop)){
                gLog.error("field " + prop + " not vaild");
                delete values[prop];
            }
        }
    }
    return true;
}

exports.Instance = function() {
  if (instance == null) {
    instance = new DB();
  }
  return instance;
};
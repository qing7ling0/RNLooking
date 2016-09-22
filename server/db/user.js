var mysql = require('mysql');

var user = {}
var pool = null;

var conf = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'rnlookingdb'
};

var getConnection = function(callback) {
    if(!callback){
        callback=function(){};
    }
    if (pool == null)
    {
        console.log('pool null');
    }
    else
    {
        pool.getConnection(function(err, connection) {
            console.log('pool getConnection' + err);
            if (err) {
                throw err;
            }
            callback(connection);
        });
    }
};

var createPool = function() {
    if(pool==null){
        pool = mysql.createPool(conf);
    }
    return pool;
}

user.GetUser = function() {
    console.log('bbb');
    createPool();

    var selectSQL = 'select * from USER';

    getConnection(function(connection) {
        var query = connection.query(selectSQL, function(err, result) {
            // if (err) {
            //     callback(err,null);
            // }else{
            //     callback(null, 'dd');//TODO　返回生成ＩＤ
            // }
            console.log('GetUser' + result[0].ID);
            connection.release(); //release
        });
    });
}

module.exports = user;
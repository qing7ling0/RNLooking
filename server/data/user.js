var user = {}

user.getAllUser = function(callback) {
    var selectSQL = 'select * from user';
    gLog.debug('getAllUser');
    gDB.queryWithSql(selectSQL, function(err, result) {
        if (err) {
            callback(err, null);
        }else{
            callback(null, result);//TODO　返回生成ＩＤ
        }
    });
}

module.exports = user;
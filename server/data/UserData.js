var crypto=require("crypto");
var moment=require('moment');

var userData = {}

var checkAccountExist = function(account, callback) {
    var sql = 'select * from user where account=?';
    gDB.executeSql(sql, [account], function(err, result) {
        if (err) {
            callback(err, gDB.status.err_error);
        }else{
            if (result && result.length > 0)
            {
                var error = new Error('账号已存在');
                callback(error, gDB.status.err_account_exist)
                gLog.error(account + ' ' + error);
            }
            else {
                callback(null, gDB.status.success);
            }
        }
    });
}

var sha1Encrypt = function(value) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(value);
    return sha1.digest('hex');
}

var loginSuccess = function(user) {

    gLog.debug(user.realname + ' login success!');
}

var registerSuccess = function(account, id) {

    gLog.debug(account + 'register success!');
}

userData.getAllUser = function(callback) {
    var selectSQL = 'select * from user';
    gDB.executeSql(selectSQL, null, function(err, result) {
        if (err) {
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

userData.login = function(account, password, callback) {
    if(!account || account.length===0 || !password || password.length===0) {
        callback({status:gDB.status.err_ac_pd_null, msg:'账号密码不能为空!'});
    } else {
        var sha1pd = sha1Encrypt(password);
        var selectSQL = 'select * from user where account=? and password=?';
        gDB.executeSql(selectSQL, [account, sha1pd], function(err, result) {
            if (err) {
                callback({status:gDB.status.err_error, msg:'登陆失败!'});
            } else {
                if (result.length === 0)
                {
                    callback({status:gDB.status.err_ac_pd_error, data:result, msg:'账号密码错误!'});
                }
                else {
                    loginSuccess(result[0]);
                    callback({status:gDB.status.success, data:result, msg:'登陆成功!'});
                }
            }
        });
    }
}

userData.register = function(account, password, callback) {    
    if(!account || account.length===0 || !password || password.length===0) {
        callback({status:gDB.status.err_ac_pd_null, msg:'账号密码不能为空!'});
    } else {
        checkAccountExist(account, function(err, status) {
            if (status === gDB.status.success) {
                var sql = 'insert into user set account=?, password=?, realname=?, create_date=?, last_login_date=?';
                var sha1pd = sha1Encrypt(password);
                gDB.executeSql(sql, [account, sha1pd, account, new Date(), new Date()], function(err, result) {
                    if (err) {
                        callback({status:status, msg:'注册失败！'});
                    } else {
                        registerSuccess(account, result.insertId);
                        callback({status:status, data:result, msg:'注册成功!'});
                    }
                });
            } else if (status === gDB.status.err_account_exist) {
                callback({status:status, msg:err.message});
            } else {
                callback({status:status, msg:'注册失败!'});
            }
        });
    }
}

module.exports = userData;
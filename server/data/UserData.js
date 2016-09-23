var userData = {}


var checkAccountExist = function(account, callback) {
    var sql = 'select top 1 * from user where account=' + account;
    gDB.executeSql(sql, [], function(err, result) {
        if (err) {
            callback(err, gDB.status.err_error);
        }else{
            if (result && result.length > 0)
            {
                callback(new Error('账号已存在'), gDB.status.err_account_exist)
            }
            else {
                callback(null, gDB.status.success);
            }
        }
    });
}

var loginSuccess = function(user, callback) {

}

var registerSuccess = function(user, callback) {

}

userData.getAllUser = function(callback) {
    var selectSQL = 'select * from user';
    gLog.debug('getAllUser');
    gDB.executeSql(selectSQL, null, function(err, result) {
        if (err) {
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

userData.login = function(account, password, callback) {
    if(!account || account.length===0 || !password || password===0) {
        callback(err, {status:gDB.status.err_account_pd_null});
    } else {
        var selectSQL = 'select * from user where account=?, password=?';
        gDB.executeSql(selectSQL, [account, password], function(err, result) {
            if (err) {
                callback(err, {status: gDB.status.err_error});
            } else {
                loginSuccess(result);
                callback(null, {status: gDB.status.success, result:result});
            }
        });
    }
}

userData.register = function(account, password, callback) {    
    if(!account || account.length===0 || !password || password===0) {
        callback(err, {status:gDB.status.err_account_pd_null});
    } else {
        checkAccountExist(account, function(err, status) {
            if (status === gDB.status.success) {
                var sql = 'insert into user set account=?, password=?';
                gDB.executeSql(sql, [account, password], function(err, result) {
                    if (err) {
                        callback(err, {status: status});
                    } else {
                        registerSuccess(result);
                        callback(null, {status: status, result:result});
                    }
                });
            } else if (status === gDB.status.err_account_exist) {
                callback(err, {status: status});
            } else {
                callback(err, {status: status});
            }
        });
    }
}

module.exports = userData;
/**
 * Created by haywire on 14/08/15.
 */

var sqldb = require('./MySQLConnector');

exports.getUserDetails = function(uid, cb) {
    var query = "SELECT name, address FROM users WHERE id='"+uid+"' LIMIT 1";
    sqldb.queryDB(query, cb);
};

exports.isUserActive = function(uid, cb) {
    var query = "SELECT active FROM users WHERE id='"+uid+"' LIMIT 1";
    sqldb.queryDB(query, function(err, rows) {
        if(err || ! rows.length) {
            cb(err, false);
        }
        else {
            rows = rows[0];
            cb(null, rows.active === 1);
        }
    });
};
/**
 * Created by prashant on 9/4/15.
 */


var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var debug = require('debug')('boot:models:mongoC');

// form the mongo user connection URL

var url = "mongodb://";

// add auth params if auth enabled
if(global.config.mongo.auth.enabled === true) {
    url += global.config.mongo.auth.username + ":" + global.config.mongo.auth.password + "@";
}

// add all the replica sets
global.config.mongo.hosts.map(function(db, i) {
    url += db + ((i === global.config.mongo.hosts.length-1) ? '/' : ',');
});

// specify db name
url += global.config.mongo.dbname;

// set replica read prefs and other options
var options = {
    server: {
        poolSize: global.config.mongo.poolSize,
        readPreference: 'primary'
    }
};


MongoClient.connect(url, options, function(err, db) {
    if(err) {
        debug("Error connecting to db: ", err);
        return;
    }
    else {
        debug("Connected to mongo");
    }

    // exports the collections
    exports.db = db;
    exports.collection = {
        Users:  db.collection('users'),
        Products: db.collection('products')
    };
});

exports.health = function(callback) {
    var start = (new Date()).getTime();
    exports.db.command({ping: 1}, function(err, result){
        var end = (new Date()).getTime();
        if(err || result.ok !== 1) {
            debug("mongo is down: ", err);
            callback(err, {status: false, time: end-start});
        }
        else {
            callback(err, {status: true, time: end-start});
        }
    });
};
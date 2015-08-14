/**
 * Created by haywire on 14/08/15.
 */

var mongo = require('./MongoConnector');

exports.getProduct = function(prodId, cb) {
    mongo.collection.Products.find({prodId: prodId}).limit(1).toArray(function(err, docs) {
        if(err) {
            cb(err, []);
        }
        else {
            cb(null, docs);
        }
    })
};
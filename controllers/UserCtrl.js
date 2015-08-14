/**
 * Created by haywire on 14/08/15.
 */
var UserModel = require('./Models/UserUtils');

exports.sayHi = function(req, res, next) {
    res.send('Howdy from User Controller!');
};

exports.randomCheck = function(req, res, next) {
    var uid = req.params.uid;
    if(uid) {
        // use a model to see how it works.
        UserModel.isUserActive(req.query.uid, function(err, isActive) {
            if(err) {
                res.status(500).json({err: true, msg: "DB Error!"});
            }
            else {
                if(isActive === true)
                    res.json({err: false, msg: "Yay! User is active!"});
                else
                    res.json({err: false, msg: "Sorry! User is not active!"});
            }
        })
    }
    else {
        res.status(400).json({err: true, msg: "User id missing from url."});
    }
};
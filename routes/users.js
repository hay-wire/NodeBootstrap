var express = require('express');
var router = express.Router();
var UserController = require('./../controllers/UserCtrl');

/* GET users listing. */
router.get('/', UserController.sayHi);

/* Sample DB use */
router.get('/isactive/:uid', UserController.randomCheck);

module.exports = router;

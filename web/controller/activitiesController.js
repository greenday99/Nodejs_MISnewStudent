var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
router.use('/public', express.static('public'));

// //載入頁面
// router.get('/newstudent', function(req, res, next) {
// 	res.render('newstudent');
// });

module.exports = router;
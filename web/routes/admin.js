var express = require('express');
var app = express();
var mysql = require('../model/mysql');
var router = express.Router();
var newsAdmin = require('../controller/newsAdminController');
var activitiesAdmin = require('../controller/activitiesAdminController');
var courseAdmin = require('../controller/courseAdminController');
var careerAdmin = require('../controller/careerAdminController');
var admin = require('../controller/adminController');
router.use('/public', express.static('public'));

router.use('/', newsAdmin);
router.use('/', activitiesAdmin);
router.use('/', courseAdmin);
router.use('/', careerAdmin);
router.use('/', admin);

// //載入管理頁面
// router.get('/admin', function(req, res, next) {
// 	res.render('admin-carrer');
// });

module.exports = router;
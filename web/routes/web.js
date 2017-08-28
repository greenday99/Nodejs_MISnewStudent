var express = require('express');
var app = express();
var mysql = require('../model/mysql');
var router = express.Router();
var news = require('../controller/newsController');
var activities = require('../controller/activitiesController');
var course = require('../controller/courseController');
var career = require('../controller/careerController');
var newstudent = require('../controller/newstudentController');
router.use('/public', express.static('public'));

router=app.use('/', news);
router=app.use('/', activities);
router=app.use('/', course);
router=app.use('/', career);
router=app.use('/', newstudent);

// //載入頁面
// router.get('/newstudent', function(req, res, next) {
// 	res.render('newstudent');
// });

module.exports = router;
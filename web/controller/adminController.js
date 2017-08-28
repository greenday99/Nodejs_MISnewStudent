var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
var async = require('async');
router.use('/public', express.static('public'));

//頁面的載入
router.get('/admin', function(req, res, next) {

    var sqls = {
        'selectActivitiesSql': 'SELECT * FROM im_activity_item,im_activity where im_activity.IMACT_TYPE= im_activity_item.IMACT_TYPE',
        'selectLessonSql': 'SELECT * FROM lesson_interview',
        'selectCareerSql1': 'SELECT * FROM career WHERE career.CAREER_TYPE="iframe"',
        'selectCareerSql2': 'SELECT * FROM career WHERE CAREER_TYPE!="iframe"',
        'selectCareerSql3': 'SELECT MAX(CAREER_ID) AS MAXID FROM career'
    };

    var tasks = ['selectActivitiesSql','selectLessonSql','selectCareerSql1','selectCareerSql2'];

    var tmp = [];
    var count = 0;

    async.eachSeries(tasks, function(item, callback){
        console.log(item + " ==> " + sqls[item]);
        mysql.getConnection(function(err, connection){
            if(err){console.log('Error connecting to Db');return;}
            mysql.query(sqls[item],function(err, rows){
                if(err){console.log(err);}           
                //console.log(rows);              
                tmp[count] = rows;
                callback(err, rows);
                // console.log(tmp[0]);
                // console.log(tmp[1]);
                count++;
                connection.release();
            });
        });
    }, function (err) {
        //console.log("err: " + err);
        res.render('admin-block', {'activities': tmp[0], 'courses': tmp[1], 'items1':tmp[2], 'items2':tmp[3], 'item':tmp[4]});
    });
});

module.exports = router;


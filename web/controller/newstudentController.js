var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
var async = require('async');
router.use('/public', express.static('public'));

//頁面的載入
router.get('/newstudent', function(req, res, next) {

    var sqls = {
        'selectLessonSql': 'SELECT * FROM lesson_interview',
        'selectActivitiesSqlA': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="A"',
        'selectActivitiesSqlB': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="B"',
        'selectActivitiesSqlC': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="C"',
        'selectActivitiesSqlD': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="D"',
        'selectActivitiesSqlE': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="E"',
        'selectActivitiesSqlF': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="F"',
        'selectActivitiesSqlG': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="G"',
        'selectActivitiesSqlH': 'SELECT * FROM im_activity_item WHERE IMACT_TYPE="H"',
        'selectActivitiesSqlAName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="A"',
        'selectActivitiesSqlBName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="B"',
        'selectActivitiesSqlCName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="C"',
        'selectActivitiesSqlDName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="D"',
        'selectActivitiesSqlEName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="E"',
        'selectActivitiesSqlFName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="F"',
        'selectActivitiesSqlGName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="G"',
        'selectActivitiesSqlHName': 'SELECT * FROM im_activity WHERE IMACT_TYPE="H"',
        'selectCareerSql1':'SELECT * FROM career WHERE CAREER_ORDER <= 4 AND CAREER_ORDER != 0 ORDER BY CAREER_ORDER ASC',
        'selectCareerSql2':'SELECT * FROM career WHERE CAREER_ORDER <= 8 AND CAREER_ORDER >= 5 AND CAREER_ORDER != 0 ORDER BY CAREER_ORDER ASC'  
    };

    var tasks = ['selectLessonSql','selectActivitiesSqlA','selectActivitiesSqlB','selectActivitiesSqlC','selectActivitiesSqlD','selectActivitiesSqlE','selectActivitiesSqlF','selectActivitiesSqlG','selectActivitiesSqlH', 'selectActivitiesSqlAName', 'selectActivitiesSqlBName', 'selectActivitiesSqlCName', 'selectActivitiesSqlDName', 'selectActivitiesSqlEName', 'selectActivitiesSqlFName', 'selectActivitiesSqlGName', 'selectActivitiesSqlHName','selectCareerSql1','selectCareerSql2'];

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
        res.render('newstudent-block', {'courses': tmp[0],'activitiesA': tmp[1], 'activitiesB': tmp[2], 'activitiesC': tmp[3], 'activitiesD': tmp[4], 'activitiesE': tmp[5], 'activitiesF': tmp[6], 'activitiesG': tmp[7], 'activitiesH': tmp[8], 'activitiesAName': tmp[9], 'activitiesBName': tmp[10], 'activitiesCName': tmp[11], 'activitiesDName': tmp[12], 'activitiesEName': tmp[13], 'activitiesFName': tmp[14], 'activitiesGName': tmp[15], 'activitiesHName': tmp[16], 'items1':tmp[17], 'items2':tmp[18]});
    });
});

module.exports = router;


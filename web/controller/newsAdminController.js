var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
router.use('/public', express.static('public'));

//獲取所有的時間軸信息
router.get('/getTimelineList', function(req, res, next) {
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\ngetTimelineList: Error connecting to Db');
            return;
        }
        console.log('\ngetTimelineList: Connection established');

        var getTimelineListSQL = 'select newstudent_timeline.TIMELINE_CODE, newstudent_timeline.NEWS_CODE, ' +
            'newstudent_timeline.START_DATE, newstudent_timeline.START_TIME, newstudent_timeline.TIMELINE_TITLE, ' +
            'newstudent_timeline.TIMELINE_LOCATION, newstudent_news_class.NEWS_CLASS_NAME, newstudent_news.IMP_CLASS_CODE, ' +
            'newstudent_imp_class.IMP_CLASS_NAME from newstudent_timeline,newstudent_imp_class, newstudent_news_class, ' +
            'newstudent_news where newstudent_news.NEWS_CODE = newstudent_timeline.NEWS_CODE and ' +
            'newstudent_news.NEWS_CLASS_CODE = newstudent_news_class.NEWS_CLASS_CODE and ' +
            'newstudent_news.IMP_CLASS_CODE = newstudent_imp_class.IMP_CLASS_CODE';

        connection.query(getTimelineListSQL, function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('getTimelineList: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        })
    })
})

//獲取消息種類列表
router.get('/getNewsClass', function(req, res, next) {
    //var JSON_Object;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\ngetNewsClass: Error connecting to Db');
            return;
        }
        console.log('\ngetNewsClass: Connection established');

        var getNewsClassSQL = 'SELECT NEWS_CLASS_CODE, NEWS_CLASS_NAME FROM newstudent_news_class order by NEWS_CLASS_CODE DESC';

        connection.query(getNewsClassSQL, function(err, rows) {
            if (err) { "getNewsClass: " + console.log(err); } else {
                console.log('getNewsClass: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//獲取最新的一則消息
router.get('/getNewestNews', function(req, res, next) {
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\ngetNewestNews: Error connecting to Db');
            return;
        }
        console.log('\ngetNewestNews: Connection established');

        var getImpNewsSQL = 'select newstudent_news.NEWS_CODE, newstudent_timeline.START_DATE, ' +
            'newstudent_news.NEWS_TITLE, newstudent_news.NEWS_CONTENT, newstudent_news.PUB_TIME, ' +
            'newstudent_news_class.NEWS_CLASS_NAME from newstudent_news, newstudent_news_class, newstudent_timeline ' +
            'where newstudent_news.NEWS_CLASS_CODE = newstudent_news_class.NEWS_CLASS_CODE and ' +
            'newstudent_news.NEWS_CODE = newstudent_timeline.NEWS_CODE ' +
            'order by newstudent_timeline.START_DATE desc ' +
            'limit 1';

        connection.query(getImpNewsSQL, function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('getNewestNews: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//獲取上一條消息
router.get('/getPreNews/:currentDate/:newsCode', function(req, res, next) {
    var currentDate = req.params.currentDate;
    var newsCode = req.params.newsCode;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\ngetPreNews: Error connecting to Db');
            return;
        }
        console.log('\ngetPreNews: Connection established');

        var getPreNewsSQL = 'select newstudent_news.NEWS_CODE, newstudent_timeline.START_DATE, ' +
            'newstudent_news.NEWS_TITLE, newstudent_news.NEWS_CONTENT, newstudent_news.PUB_TIME, ' +
            'newstudent_news_class.NEWS_CLASS_NAME from newstudent_news, newstudent_news_class, newstudent_timeline ' +
            'where newstudent_news.NEWS_CLASS_CODE = newstudent_news_class.NEWS_CLASS_CODE and ' +
            'newstudent_news.NEWS_CODE = newstudent_timeline.NEWS_CODE and str_to_date(newstudent_timeline.START_DATE, "%Y-%m-%d") <= str_to_date(?, "%Y-%m-%d") ' +
            'and newstudent_news.NEWS_CODE != ? ' +
            'order by newstudent_timeline.START_DATE desc limit 1';

        connection.query(getPreNewsSQL, [currentDate, newsCode], function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('getPreNews: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//獲取下一條消息
router.get('/getNextNews/:currentDate/:newsCode', function(req, res, next) {
    var currentDate = req.params.currentDate;
    var newsCode = req.params.newsCode;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\ngetNextNews: Error connecting to Db');
            return;
        }
        console.log('\ngetNextNews: Connection established');

        var getNextNewsSQL = 'select newstudent_news.NEWS_CODE, newstudent_timeline.START_DATE, newstudent_news.NEWS_TITLE, newstudent_news.NEWS_CONTENT, newstudent_news.PUB_TIME, ' +
            'newstudent_news_class.NEWS_CLASS_NAME from newstudent_news, newstudent_news_class, newstudent_timeline ' +
            'where newstudent_news.NEWS_CLASS_CODE = newstudent_news_class.NEWS_CLASS_CODE and ' +
            'newstudent_news.NEWS_CODE = newstudent_timeline.NEWS_CODE and str_to_date(newstudent_timeline.START_DATE, "%Y-%m-%d") >= str_to_date(?, "%Y-%m-%d") ' +
            'and newstudent_news.NEWS_CODE != ? ' +
            'order by newstudent_timeline.START_DATE limit 1';

        connection.query(getNextNewsSQL, [currentDate, newsCode], function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('getNextNews: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//判斷是否爲最大的START_DATE
router.get('/isMaxStartDate/:current', function(req, res, next) {
    var current = req.params.current;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\nisMaxStartDate: Error connecting to Db');
            return;
        }
        console.log('\nisMaxStartDate: Connection established');

        var isMaxStartDateSQL = 'select IF((select str_to_date(START_DATE, "%Y-%m-%d") from newstudent_timeline ' +
            'where str_to_date(START_DATE, "%Y-%m-%d") > str_to_date(?, "%Y-%m-%d") limit 1), 1, 0) as result';

        connection.query(isMaxStartDateSQL, [current], function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('isMaxStartDate: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//判斷是否爲最小的START_DATE
router.get('/isMinStartDate/:current', function(req, res, next) {
    var current = req.params.current;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\nisMinStartDate: Error connecting to Db');
            return;
        }
        console.log('\nisMinStartDate: Connection established');

        var isMinStartDateSQL = 'select IF((select str_to_date(START_DATE, "%Y-%m-%d") from newstudent_timeline ' +
            'where str_to_date(START_DATE, "%Y-%m-%d") < str_to_date(?, "%Y-%m-%d") limit 1), 1, 0) as result';

        connection.query(isMinStartDateSQL, [current], function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('isMinStartDate: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//獲取選定的某個消息
router.get('/getSelectedNews/:newsCode', function(req, res, next) {
	var newsCode = req.params.newsCode;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('\ngetSelectedNews: Error connecting to Db');
            return;
        }
        console.log('\ngetSelectedNews: Connection established');

        var getSelectedNewsSQL = 'select newstudent_news.NEWS_CODE, newstudent_timeline.START_DATE, ' +
            'newstudent_news.NEWS_TITLE, newstudent_news.NEWS_CONTENT, newstudent_news.PUB_TIME, ' +
            'newstudent_news_class.NEWS_CLASS_NAME from newstudent_news, newstudent_news_class, newstudent_timeline ' +
            'where newstudent_news.NEWS_CLASS_CODE = newstudent_news_class.NEWS_CLASS_CODE and ' +
            'newstudent_news.NEWS_CODE = newstudent_timeline.NEWS_CODE and newstudent_news.NEWS_CODE = ?';

        connection.query(getSelectedNewsSQL, [newsCode], function(err, rows) {
            if (err) { console.log(err); } else {
                console.log('getSelectedNews: Data received from Db:');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//編輯部分
//刪除消息
router.post('/deleteNews', function(req, res) {
	var NEWS_CODE = req.body.NEWS_CODE;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('deleteNews: Error connecting to Db');
            return;
        }
        console.log('deleteNews: Connection established');

        var deleteNewsSQL = 'delete from newstudent_news where NEWS_CODE = ?';
        var deleteTimeLineSQL = 'delete from newstudent_timeline where NEWS_CODE = ?';

        connection.query(deleteTimeLineSQL, NEWS_CODE, function(err, fields) {
            if (err) { console.log('delete timeline: ' + err); } else {
                console.log('delete timeline: delete success');
            }
        });
        connection.query(deleteNewsSQL, NEWS_CODE, function(err, fields) {
            if (err) { console.log('delete news table: ' + err); } else {
                console.log('delete news table: delete success');
            }
        });
        connection.release();
        res.end();
    });
});

//獲取要更新的消息的詳細資料
router.get('/getNews/:id', function(req, res, next) {
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('getNews: Error connecting to Db');
            return;
        }
        console.log('getNews: Connection established');

        var getNEWSSQL = 'SELECT NEWS_CODE, NEWS_TITLE, NEWS_CONTENT from newstudent_news ' +
            'where newstudent_news.NEWS_CODE = ?';

        connection.query(getNEWSSQL, [req.params.id], function(err, rows) {
            if (err) { "getNews: " + console.log(err); } else {
                console.log('getNews: Data received from Db:\n');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//提交消息的更新
router.post('/updateNews', function(req, res) {
	var newsCode = req.body.NEWS_CODE;
	var newsTitle = req.body.NEWS_TITLE;
	var newsContent = req.body.NEWS_CONTENT;
	console.log(newsCode);

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('update news: Error connecting to Db');
            return;
        }
        console.log('update news: Connection established');

        var updateSQL = "UPDATE newstudent_news SET NEWS_TITLE = ?, NEWS_CONTENT = ? WHERE NEWS_CODE = ? ";
        connection.query(updateSQL, [newsTitle, newsContent, newsCode], function(err, rows, fields) {
            if (err) { "update news: " + console.log(err); } else {
                console.log('update news is success.');
            }
        });
        connection.release();
        res.end();
    });
});

//獲取timeline信息
router.get('/getNewsTimeLine/:newsCode', function(req, res, next) {
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('getNewsTimeLine: Error connecting to Db');
            return;
        }
        console.log('getNewsTimeLine: Connection established');

        var getNEWSSQL = 'SELECT newstudent_timeline.NEWS_CODE, newstudent_timeline.TIMELINE_TITLE, ' +
            'newstudent_timeline.START_DATE, newstudent_timeline.START_TIME, newstudent_timeline.TIMELINE_LOCATION, ' +
            'newstudent_news_class.NEWS_CLASS_NAME, newstudent_imp_class.IMP_CLASS_NAME, ' +
            'newstudent_news.NEWS_CLASS_CODE, newstudent_news.IMP_CLASS_CODE ' +
            'from newstudent_news, newstudent_timeline, newstudent_news_class,  newstudent_imp_class ' +
            'where newstudent_news.NEWS_CODE = ? and newstudent_news.NEWS_CODE = newstudent_timeline.NEWS_CODE and ' +
            'newstudent_news_class.NEWS_CLASS_CODE = newstudent_news.NEWS_CLASS_CODE ' +
            'and newstudent_imp_class.IMP_CLASS_CODE = newstudent_news.IMP_CLASS_CODE';

        connection.query(getNEWSSQL, [req.params.newsCode], function(err, rows) {
            if (err) { "getNewsTimeLine: " + console.log(err); } else {
                console.log('getNewsTimeLine: Data received from Db:\n');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//獲取重要程度列表
router.get('/getNewsImpClass', function(req, res, next) {
    //var JSON_Object;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('getNewsImpClass: Error connecting to Db');
            return;
        }
        console.log('getNewsImpClass: Connection established');

        var getNewsClassSQL = 'SELECT IMP_CLASS_CODE, IMP_CLASS_NAME FROM newstudent_imp_class';

        connection.query(getNewsClassSQL, function(err, rows) {
            if (err) { "getNewsImpClass: " + console.log(err); } else {
                console.log('getNewsImpClass: Data received from Db:\n');
                res.json(rows);
                connection.release();
                res.end();
            }
        });
    });
});

//提交timeline的更新
router.post('/updateNewsTimeLine', function(req, res) {
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('updateNewsTimeLine: Error connecting to Db');
            return;
        }
        console.log('updateNewsTimeLine: Connection established');

        var updateNewstudentClass = "UPDATE newstudent_news SET NEWS_CLASS_CODE = ?, IMP_CLASS_CODE = ? WHERE NEWS_CODE = ? ";
        var updateNewsTimeline = "UPDATE newstudent_timeline SET START_DATE = ?, START_TIME = ?, TIMELINE_TITLE = ?, TIMELINE_LOCATION = ? WHERE NEWS_CODE = ? ";
        var startDate = req.body.START_DATE;
        var startTime = req.body.START_TIME;
        connection.query(updateNewstudentClass, [req.body.NEWS_CLASS_CODE, req.body.IMP_CLASS_CODE, req.body.NEWS_CODE], function(err, rows, fields) {
            if (err) { "updateNewstudentClass: " + console.log(err); } else {
                console.log('updateNewstudentClass is success.');
            }
        });
        connection.query(updateNewsTimeline, [startDate, startTime, req.body.TIMELINE_TITLE, req.body.TIMELINE_LOCATION, req.body.NEWS_CODE], function(err, rows, fields) {
            if (err) { "updateNewsTimeline: " + console.log(err); } else {
                console.log('updateNewsTimeline is success.');
            }
        });
        connection.release();
        res.end();
    });
});

//新增時間軸項目
router.post('/newNewsTimeLine', function(req, res) {
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log('newNewsTimeLine: Error connecting to Db');
            return;
        }
        console.log('newNewsTimeLine: Connection established');

        var startDate = req.body.NEW_START_DATE;
        var startTime = req.body.NEW_START_TIME;
        var timelineTitle = req.body.NEW_TIMELINE_TITLE;
        var timelineLocation = req.body.NEW_TIMELINE_LOCATION;
        var impClassCode = req.body.NEW_IMP_CLASS_CODE;
        var newsClassCode = req.body.NEW_NEWS_CLASS_CODE;

        if (timelineLocation == '') {
            timelineLocation = "無";
        }

        var time = new Date();
        var pubTime = time.toLocaleDateString() + " " + time.toLocaleTimeString();

        var newNewstudentClass = 'INSERT INTO newstudent_news(PUB_TIME, NEWS_TITLE, NEWS_CLASS_CODE, IMP_CLASS_CODE) VALUES(?, ?, ?, ?) ';
        var newNewsTimeline = 'INSERT INTO newstudent_timeline(NEWS_CODE, START_DATE, START_TIME, TIMELINE_TITLE, TIMELINE_LOCATION) ' +
            'VALUES((SELECT NEWS_CODE FROM newstudent_news where PUB_TIME = ? and NEWS_CLASS_CODE = ? and IMP_CLASS_CODE = ?), ?, ?, ?, ?)';

        connection.query(newNewstudentClass, [pubTime, timelineTitle, newsClassCode, impClassCode], function(err, rows, fields) {
            if (err) { "newNewstudentClass: " + console.log(err); } else {
                console.log('newNewstudentClass is success.');
            }
        });
        connection.query(newNewsTimeline, [pubTime, newsClassCode, impClassCode, startDate, startTime, timelineTitle, timelineLocation], function(err, rows, fields) {
            if (err) { "newNewsTimeline: " + console.log(err); } else {
                console.log('newNewsTimeline is success.');
            }
        });
        connection.release();
        res.end();
    });
});

module.exports = router;
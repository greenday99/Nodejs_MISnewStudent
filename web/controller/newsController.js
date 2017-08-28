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

module.exports = router;
var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
router.use('/public', express.static('public'));

//載入管理頁面
// router.get('/admin', function(req, res, next) {
// 	res.render('admin');
// });


//提交消息的更新
router.post('/course_update/:id', function(req, res) {
    mysql.getConnection(function(err, connection) {
        if (err) {console.log('update: Error connecting to Db');return;}
        console.log('update: Connection established');
        var updateSQL = "UPDATE lesson_interview SET ? WHERE interview_id = ? ";
        connection.query(updateSQL, [req.body, req.params.id], function(err, rows, fields) {
            if (err) { "update: " + console.log(err); }
            console.log('update is success.');
        });
        res.redirect("/admin/admin");
        connection.release();
        res.end();
    });
});

module.exports = router;
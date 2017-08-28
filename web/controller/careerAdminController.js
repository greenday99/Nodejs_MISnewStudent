var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
router.use('/public', express.static('public'));

// //載入管理頁面
// router.get('/admin', function(req, res, next) {
// 	res.render('admin');
// });

/*修改職業資料*/
router.post('/update/:id', function(req, res){
    mysql.getConnection(function(err, connection){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        //console.log('Connection established');
        var updateputsql = "UPDATE career SET ? WHERE CAREER_ID = ?";
        connection.query(updateputsql, [req.body, req.params.id], function(err, rows, fields){
            if(err){console.log(err);}
            //console.log('update is success.');
        });
        res.redirect('/admin/admin');
        connection.release();
    });
});

/*刪除職業資料*/
router.get('/delete/:id', function(req, res){
    mysql.getConnection(function(err, connection){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
        var deletesql = 'delete from career where CAREER_ID = ?';
        connection.query(deletesql, [req.params.id], function(){
            if(err){console.log(err);}          
        });
        var careersql = 'select * from career';
        res.redirect('/admin/admin');
        connection.release();
    });
});

/*新增職業資料*/
router.post('/create', function(req, res, next){
    console.log('postcreate')
    mysql.getConnection(function(err, connection){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        //console.log('Connection established');
        var insertsql = "INSERT INTO career SET ? ";
        connection.query(insertsql, req.body, function(err, fields){
            if(err){console.log(err);}//console.log("bad");console.log(req.body);}
        });
        res.redirect('/admin/admin');
        connection.release();
    });
});

/*新增iframe*/
router.post('/create_iframe', function(req, res, next){
    console.log('postcreate')
    mysql.getConnection(function(err, connection){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        //console.log('Connection established');
        var insertsql = "INSERT INTO career SET ? ";
        connection.query(insertsql, req.body, function(err, fields){
            if(err){console.log(err);}//console.log("bad");console.log(req.body);}
        });
        res.redirect('/admina/admin');
        connection.release();
    });
});

module.exports = router;
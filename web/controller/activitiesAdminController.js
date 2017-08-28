var express = require('express');
var mysql = require('../model/mysql');
var router = express.Router();
router.use('/public', express.static('public'));

// //載入管理頁面
// router.get('/admin', function(req, res, next) {
// 	res.render('admin');
// });



/*修改活動照片資料*/
router.post('/activities_update/:id', function(req, res) {
    mysql.getConnection(function(err, connection) {
        if (err) {console.log('update: Error connecting to Db');return;}
        console.log('update: Connection established');
        var updateSQL = "UPDATE im_activity_item SET ? WHERE ITEM_CODE = ? ";
        connection.query(updateSQL, [req.body, req.params.id], function(err, rows, fields) {
            if (err) { "update: " + console.log(err); }
            console.log('update is success.');
        });
        res.redirect("/admin/admin");
        connection.release();
        res.end();
    });

});

/*新增活動照片資料*/
router.post('/activities_create', function(req, res){
   
    mysql.getConnection(function(err, connection){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('insert: Connection established');
        var insertSQL = "INSERT INTO im_activity_item SET ? ";
        connection.query(insertSQL, req.body, function(err,fields){
            if(err){console.log(err);}//console.log("bad");console.log(req.body);}
        });
        res.redirect("/admin/admin");
        connection.release();
        res.end();
    });
});


/*刪除照片資料*/
router.get('/activities_delete/:id', function(req, res){
    mysql.getConnection(function(err, connection){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
        var deletesql = 'delete from im_activity_item where ITEM_CODE = ?';
        connection.query(deletesql, [req.params.id], function(){
            if(err){console.log(err);}          
        });
        res.redirect("/admin/admin");
        connection.release();
        res.end();
    });
});


// /*修改活動照片資料*/
// router.get('/activities_update/:id', function(req, res){
//     mysql.getConnection(function(err, connection){
//         if(err){
//             console.log('Error connecting to Db');
//             return;
//         }
//         //console.log('Connection established');
//         var updategetsql2 = 'SELECT * from im_activity_item where ITEM_CODE = ?';
//         connection.query(updategetsql2, [req.params.id], function(err, rows, fields){
//             if(err){console.log(err);}
//             console.log('search is success.');
//             res.render('create2', {title : 'Update im_activity_item', 'user' : rows[0]});
//         });
//         connection.release();
//     });
// });

// router.post('/update_imact_item/:id', function(req, res){
//     mysql.getConnection(function(err, connection){
//         if(err){
//             console.log('Error connecting to Db');
//             return;
//         }
//         //console.log('Connection established');
//         var updateputsql2 = "UPDATE im_activity_item SET ? WHERE ITEM_CODE = ? ";
//         connection.query(updateputsql2, [req.body, req.params.id], function(err, rows, fields){
//             if(err){console.log(err);}
//             //console.log('update is success.');
//         });
//         var im_activity_itemsql2 = 'select * from im_activity_item';
//         connection.query(im_activity_itemsql2, function(err, rows){
//             if(err){console.log(err);}
//             res.render('im_activity_item', {title : 'im_activity_item', 'items': rows});
//         });
//         connection.release();
//     });
// });

// /*新增活動照片資料*/
// router.get('/create_imact_item', function(req, res, next){
//     res.render('create2', {title : '建立新的使用者'});
// });

// router.post('/create_imact_item', function(req, res, next){
//     console.log('postcreate')
//     mysql.getConnection(function(err, connection){
//         if(err){
//             console.log('Error connecting to Db');
//             return;
//         }
//         //console.log('Connection established');
//         var insertsql2 = "INSERT INTO im_activity_item SET ? ";
//         connection.query(insertsql2, req.body, function(err, fields){
//             if(err){console.log(err);}//console.log("bad");console.log(req.body);}
//         });
//         var imact_itemsql = 'select * from im_activity_item';
//         connection.query(imact_itemsql, function(err, rows){
//             if(err){console.log(err);}
//             res.render('im_activity_item', {title : 'im_activity_item', 'items': rows});
//         });
//         connection.release();
//     });
// });


// /*刪除照片資料*/
// router.get('/delete_imact_item/:id', function(req, res){
//     mysql.getConnection(function(err, connection){
//         if(err){
//             console.log('Error connecting to Db');
//             return;
//         }
//         console.log('Connection established');
//         var deletesql = 'delete from im_activity_item where ITEM_CODE = ?';
//         connection.query(deletesql, [req.params.id], function(){
//             if(err){console.log(err);}          
//         });
//         var imact_itemsql = 'select * from im_activity_item';
//         connection.query(imact_itemsql, function(err, rows){
//             if(err){console.log(err);}
//             res.render('im_activity_item', {title : 'im_activity_item', 'items': rows});
//         });
//         connection.release();
//     });
// });


module.exports = router;
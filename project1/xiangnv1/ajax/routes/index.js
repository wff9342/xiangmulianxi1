var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '14250m',
  database : 'test'
});

router.get('/', function (req, res) {
        var  sql = 'SELECT * FROM users';
        connection.query(sql,function (err, result) {
            if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
            }
             result=zhuanhuan(result);
             res.setHeader('content-type', 'text/html;charset=utf8'); //设置返回页面字符集
             res.end(JSON.stringify(result)); //返回读取结果             
        }); 
});
function zhuanhuan(data) {
    var array = {};
    for (var i = 0; i < data.length; i++) {
        var key = data[i].user;
        array[key] = {
            'name': data[i].name,
            'password': data[i].w_password,
            'profession': data[i].profession,
            'id': data[i].w_id
        };
    }
    return array;
  }
    

module.exports = router;
 
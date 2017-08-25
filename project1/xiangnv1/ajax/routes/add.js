var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var user = {
    "user5":{
       "name" : "honey",
       "password" : "password6",
       "profession" : "students",
       "id": 23
    }
 }
/* GET home page. */
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '14250m',
  database : 'test'
});

router.get('/', function (req, res) {
    var  addSql = 'INSERT INTO users(user,name,w_password,profession,w_id) VALUES(?,?,?,?,?)';
    var  addSqlParams = ['user5',user.user5.name,user.user5.password,user.user5.profession,user.user5.id];
    connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }
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
 
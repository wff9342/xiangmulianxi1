var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var url=require('url');
var http = require('http');

/* GET home page. */
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '14250m',
  database : 'user'
});

router.get('/', function (req, res) {
        
        var name=url.parse(req.url,true).query.name;
        var passworld=url.parse(req.url,true).query.passworld;
        console.log(req.url);
        var  sql = 'SELECT * FROM information';
        connection.query(sql,function (err, result) {
            if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
            }
             
            for(var i=0;i<result.length;i++){
                if(result[i].username==name&&result[i].userpassworld==passworld)
                {
                    // res.setHeader('content-type', 'text/html;charset=utf8'); //设置返回页面字符集
                    res.end('登陆成功');

                }
                else{
                    // res.setHeader('content-type', 'text/html;charset=utf8'); //设置返回页面字符集
                    res.end('用户名或密码错误');
                }
            }            
        });
});

    

module.exports = router;
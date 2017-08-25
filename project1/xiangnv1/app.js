var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs'); 
var url =require('url');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var user = {
       "user5":{
          "name" : "honey",
          "password" : "password6",
          "profession" : "students",
          "id": 23
       }
    }
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '14250m',
  database : 'test'
});

app.get('/listUsers', function (req, res) {
    
    var id=url.parse(req.url,true).query.id;
    if(id==undefined){
        var  sql = 'SELECT * FROM users';
        connection.query(sql,function (err, result) {
            if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
            }
            res.render('form', { object:result });
        }); 
    }else
   {
        var  sql = 'SELECT * FROM users WHERE w_id= '+id;
        connection.query(sql,function (err, result) {
            if(err){
                 console.log('[SELECT ERROR] - ',err.message);
                  return;
            }
             res.render('form', { object:result });
       });
    }
});
    

 app.get('/addUser', function (req, res) {
    // 读取已存在的数据
        
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
                     res.render('form', { object:result });
               });
              
        }); 
 });
 app.get('/updataUser', function (req, res) {
       
    
        var modSql = 'UPDATE users SET name = ?,w_password = ? WHERE w_id=?';
        var modSqlParams = ['gome', 'password123',3];
        
        connection.query(modSql,modSqlParams,function (err, result) {
            if(err){
                    console.log('[UPDATE ERROR] - ',err.message);
                    return;
            } 
            var  sql = 'SELECT * FROM users  ';
            connection.query(sql,function (err, result) {
                if(err){
                     console.log('[SELECT ERROR] - ',err.message);
                      return;
                }
                 res.render('form', { object:result });
           });       
        });
                

 });
 

 app.get('/deleteUser', function (req, res) {
       // First read existing users.
        
        var id=url.parse(req.url,true).query.id;
        var delSql = 'DELETE FROM users where w_id='+id;
        console.log(delSql);
        connection.query(delSql,function (err, result) {
              if(err){
                console.log('[DELETE ERROR] - ',err.message);
                return;
              }        
              var  sql = 'SELECT * FROM users';
              connection.query(sql,function (err, result) {
                  if(err){
                       console.log('[SELECT ERROR] - ',err.message);
                        return;
                  }
                   res.render('form', { object:result });
             });
      });
    }); 

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

 
 

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs'); 
var id = 2;
var url =require('url');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
}
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




app.get('/listUsers', function (req, res) {
    
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        var id=url.parse(req.url,true).query.id;
        if(id==undefined){
            connection.end();
            data = JSON.parse( data );
            console.log( data );
            res.render('form', { object:data });
        }else
        {
            data = JSON.parse( data );
            var user = data["user" + id] 
            console.log( user );
            res.end( JSON.stringify(user));
            res.render('form', { object:user });
        }
    
    });
}); 
    

 app.get('/addUser', function (req, res) {
    // 读取已存在的数据
    fs.readFile( __dirname + "/" + "users.json", 'utf-8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
        fs.writeFile('users.json', JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('ok.');
            }
        });
    
    });
    
 });

 

 app.get('/deleteUser', function (req, res) {
    
       // First read existing users.
       fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
           data = JSON.parse( data );
           var id=url.parse(req.url,true).query.id;
           delete data["user" + id]; 
           console.log( data );
           res.end( JSON.stringify(data));
           fs.writeFile('users.json',JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('ok.');
            }
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


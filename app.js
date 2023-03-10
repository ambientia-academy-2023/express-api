var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
const loginRouter = require('./routes/login');


var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//suojaamattomat endpointit
app.use('/login',loginRouter);

//suojatut endpointit
app.use(authenticateToken);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/book',bookRouter);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

module.exports = app;

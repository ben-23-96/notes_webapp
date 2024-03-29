var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
//var cookieParser = require('cookie-parser');
const { getNotes, putNote, deleteNote } = require('./db/db')

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api')
require('dotenv').config();

var app = express();
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { error: err.message });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(process.env.REACT_APP_URL)
    console.log(process.env.PORT)
})

module.exports = app;
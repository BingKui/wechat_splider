let express = require('express');
let app = express();
let log4js = require('log4js');
var log = log4js.getLogger("app");


let ListItem = require('./router/listItem');
// let tagList = require('./router/tagList');

log4js.configure('./config/log4js.json');
app.use(log4js.connectLogger(log4js.getLogger("http"), {
	level: 'auto',
	format: ':method :url'
}));

app.use('/', ListItem);

// app.use('/tagList', tagList);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		log.error("Something went wrong:", err);
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
	log.error("Something went wrong:", err);
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});



app.listen(3000);

log.info('server start at 3000!');
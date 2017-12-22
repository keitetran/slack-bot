/* 
 * @Project    My Home IoT
 * @Version    1.0.1
 * @Author     Tran Ngoc Anh
 * @Email      tran.ngoc.anh@infogram.co.jp
 * @License    MIT License
 * @Copyright  2017 Keite Tran
 */
module.exports = (app) => {

	// Dynamic Router URL
	// -------------------------------------
	require('../controllers/index')(app);

	// catch 404 and forward to error handler
	// -------------------------------------
	app.use((req, res, next) => {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});


	// error handler
	// -------------------------------------
	app.use((err, req, res, next) => {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error', {
			title: '404 error'
		});
	});
};
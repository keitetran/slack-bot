/*
 * @Project    Cua Hang Tap Hoa
 * @Version    1.0.1
 * @Author     Tran Ngoc Anh
 * @Email      tran.ngoc.anh@infogram.co.jp
 * @License    MIT License
 * @Copyright  2017 Keite Tran
 */

module.exports = (app) => {

	// GET home page
	// -------------------------
	app.get('/', function (req, res) {
		// Render view
		res.render('index', {
			title: 'Index'
		});

		// Socket for child page
		app.io.on('connection', socket => {
			// Client connected
			// console.log('Client connected...' + socket.id);
		});
	});
};
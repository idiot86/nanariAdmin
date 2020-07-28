const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const client = mysql.createConnection({
	user : 'root',
	password : 'hancom123',
	database : 'nanari_admin'
});

const app = express();

app.use(bodyParser.urlencoded({
	extended : false
}));

app.listen(52273, function() {
	console.log('Server is running at : http://127.0.0.1:52273');
});

app.get('/notice/list', function(req, res) {
	var afterId = req.query.afterId ? req.query.afterId : -1;
	var limit = req.query.limit ? req.query.limit : 10;
	
	console.log (afterId + ", " +limit);
	
	client.query(
		'SELECT id, DATE_FORMAT(reg_datetime, "%Y-%m-%d") AS reg_date, title FROM notice WHERE is_visible=1 AND id < ? ORDER BY reg_datetime DESC LIMIT 0, ?',
		[afterId, limit],
		function(err, results) {
			if (err) {
				res.send(err);
			} else {
				res.json(results);
			}
		});
});

app.get('/notice/:id', function(req, res) {
	client.query(
		'SELECT id, DATE_FORMAT(reg_datetime, "%Y-%m-%d") AS reg_date, title, contents FROM notice WHERE is_visible=1 AND id=?',
		req.params.id,
		function(err, results) {
			if (err) {
				res.send(err);
			} else {
				res.json(results);
			}
		});
});

app.get('/delete/:id', function(req, res) {

});

app.get('/insert', function(req, res) {

});

app.post('/insert', function(req, res) {

});

app.get('/edit/:id', function(req, res) {

});

app.post('/edit/:id', function(req, res) {

});
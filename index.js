const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'musicweb'
})
connection.connect();

app.use(cors());

app.get('/api/albums', function (req, res) {
	var qstr = 'select * from albums';
	var obj  = [];
	connection.query(qstr, function(err, rows, cols) {
		if (err) throw err;
		res.json(rows);
	});
});

app.post('/api/upload', function (req, res) {
	obj = {};
	obj.name = req.body.name;
	obj.artist = req.body.artist;
	obj.genre = req.body.genre;
	obj.nation = req.body.nation;
	obj.year = req.body.year;
	obj.volume = req.body.volume;
	obj.rating = req.body.rating;

	const qstr = "insert into albums(name,artist,genre,nation,year,volume,rating) values("
		     + obj.name + "," + obj.artist + "," + obj.genre + "," + obj.nation + "," +
		     obj.year + "," + obj.volume + "," + obj.rating + ")";

	connection.query("INSERT INTO albums SET ?", obj, function(err, rows, cols) {
		if (err) throw err;
		res.send(qstr);
	});
});

app.listen(port, () => console.log('MUSIC ALBUM API RUNNING...'));

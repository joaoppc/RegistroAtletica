var express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express()

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'rachelpbm',
	password: 'adgjlra1',
	database: 'atletica'
})

app.get('/', function (req, res) {
	connection.query('SELECT * FROM MODALIDADE', function (error, modalidades, fields) {
		if (error) throw error;
		console.log("Quantidade de modalidades:" + modalidades.length);
		//listar modalidades
		//listar jogos
	    res.render('index', {mods:modalidades});
	});
});


app.listen(3000, function () {
	console.log('Servidor rodando na porta 3000!')
})

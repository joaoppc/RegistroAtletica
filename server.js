var express = require('express');
var mysql = require('mysql');


var app = express();

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

/*MySql connection*/
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'rachelpbm',
    password : 'adgjlra1',
    database : 'atletica'
});

//mapeamento para home
app.get('/', function (req, res) {
	connection.query('SELECT * FROM MODALIDADE', function (error, modalidades, fields) {
		if (error) throw error;
		console.log("Quantidade de modalidades:" + modalidades.length);
		//listar modalidades
		//listar jogos
	    res.render('index', {mods:modalidades});
});


// Criar modalidade

//start Server
app.listen(3000, function () {
console.log('Servidor rodando na porta 3000!')
});
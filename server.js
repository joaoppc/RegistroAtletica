var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path = require('path');
var fs = require('fs');
var busboy = require("then-busboy");
var fileUpload = require('express-fileupload');
var alimentar = [];
var atividades = [];
var interesses = [];
var interesses_evento = [];
var interesses_usuario = [];
var usuarios = [];
var end_usuario;
var user_id;
var filtro;
/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());
app.use(fileUpload());

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
        console.log(modalidades[0].Nome);
        //listar modalidades
        //listar jogos
        res.render('index', {modalidades:modalidades});
    });
});

app.get('/nova_modalidade', function(req, res) {
    res.sendFile('views/cria_modalidade.html' , { root : __dirname});
 });

app.get('/novo_jogo', function(req, res) {
    res.sendFile('views/cria_jogo.html' , { root : __dirname});
 });

app.get('/novo_endereco', function(req, res) {
    res.sendFile('views/cria_lugar.html' , { root : __dirname});
 });

// Criar modalidade
app.post('/nova_modalidade', function(req, res) {
    console.log("entrou em /nova_modalidade");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var nova_mod = {
        //foto: img_name,
        Nome: req.body.nome,
        Genero: req.body.genero,
        Caixinha:req.body.caixinha
    };

    connection.query("INSERT INTO MODALIDADE SET ?", nova_mod, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(nova_mod);
});

// Criar modalidade
app.post('/novo_jogo', function(req, res) {
    console.log("entrou em /novo_jogo");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var novo_jogo = {
        //foto: img_name,
        Nome_Mod: req.body.nome,
        Genero_Mod: req.body.genero,
        ID_Lugar: req.body.lugar,
        Horario: req.body.horario
    };

    connection.query("INSERT INTO JOGOS_TREINO SET ?", novo_jogo, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(novo_jogo);
});

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!')
})
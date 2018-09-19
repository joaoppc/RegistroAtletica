var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path = require('path');
var fs = require('fs');
var busboy = require("then-busboy");
var fileUpload = require('express-fileupload');

var modalidade;

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
    database: 'atletica',
    multipleStatements: true
})

app.get('/', function (req, res) {
    connection.query('SELECT * FROM MODALIDADE ; SELECT * FROM Jogo;', [1,2] , function (error, mod_jogo, fields) {
        if (error) throw error;
        console.log("Quantidade de modalidades:" + mod_jogo.length);
        console.log(mod_jogo[0])
        console.log(mod_jogo[1])
        //console.log(modalidades[0].Nome);
        //listar modalidades
        //listar jogos
        res.render('index', {modalidades:mod_jogo[0],jogo:mod_jogo[1]});
    });
});

app.get('/nova_modalidade', function(req, res) {
    res.sendFile('views/cria_modalidade.html' , { root : __dirname});
 });

app.get('/novo_jogo', function (req, res) {
    connection.query('SELECT * FROM MODALIDADE ; SELECT * FROM LUGAR;', [1,2] , function (error, mod_lugar, fields) {
        if (error) throw error;
        console.log(mod_lugar[0])
        console.log(mod_lugar[1])
        res.render('cria_jogo', {modalidades:mod_lugar[0], lugares:mod_lugar[1]});
    });
});

app.get('/novo_endereco', function(req, res) {
    res.sendFile('views/cria_lugar.html' , { root : __dirname});
 });

app.get('/novo_treino', function(req, res) {
    connection.query('SELECT * FROM MODALIDADE ; SELECT * FROM LUGAR;', [1,2] , function (error, mod_lugar, fields) {
        if (error) throw error;
        console.log(mod_lugar[0])
        console.log(mod_lugar[1])
        res.render('cria_treino', {modalidades:mod_lugar[0], lugares:mod_lugar[1]});
    });
 });

app.get('/novo_tecnico', function(req, res) {
    res.sendFile('views/cria_tecnico.html' , { root : __dirname});
 });

app.get('/novo_atleta', function(req, res) {
    res.sendFile('views/cria_atleta.html' , { root : __dirname});
 });

app.get('/gerencia_atletas', function(req, res) {
    connection.query('SELECT * FROM MODALIDADE ; SELECT * FROM ATLETA;', [1,2] , function (error, mod_atl, fields) {
        if (error) throw error;
        res.render('gerencia_atletas', {modalidades:mod_atl[0], atletas:mod_atl[1]});
    });
 });

app.get('/gerencia_tecnicos', function(req, res) {
    connection.query('SELECT * FROM MODALIDADE ; SELECT * FROM TECNICO;', [1,2] , function (error, mod_tec, fields) {
        if (error) throw error;
        res.render('gerencia_tecnicos', {modalidades:mod_tec[0], tecnicos:mod_tec[1]});
    });
 });

app.get('/modalidade/:Nome_Mod', function(req,res){
    console.log("Entrou em modalidade/");
    var Nome_Mod = req.params.Nome_Mod;
    console.log(Nome_Mod);
    //precisa fazer um join de atletas e atletas modalidades
    connection.query('SELECT * FROM MODALIDADE WHERE Nome = ?; SELECT * FROM TREINO WHERE Nome_Mod = ? ; SELECT * FROM ATLETA INNER JOIN ATLETA_MODALIDADE ON ATLETA.Matricula = ATLETA_MODALIDADE.Matricula WHERE Nome_Mod = ? ;SELECT * FROM TECNICO INNER JOIN TREINADOR_MOD ON TECNICO.ID_Tecnico = TREINADOR_MOD.ID_Tecnico WHERE Nome_Mod = ? ',[Nome_Mod, Nome_Mod,Nome_Mod,Nome_Mod], function (error, mod_treino_atl, fields)  {
        if(error) throw error;      

        res.render('modalidade',{modalidade:mod_treino_atl[0], treinos:mod_treino_atl[1],atletas:mod_treino_atl[2],tecnico:mod_treino_atl[3]});
        console.log(modalidade);
    });
});

app.get('/jogo/:ID_Jogo', function(req,res){
    console.log("Entrou em jogo/");
    var ID_Jogo = req.params.ID_Jogo;
    console.log(ID_Jogo);
    //precisa fazer um join de atletas e atletas modalidades
    connection.query('SELECT * FROM JOGO INNER JOIN LUGAR ON JOGO.ID_Lugar = LUGAR.ID_Lugar WHERE ID_Jogo = ?',[ID_Jogo], function (error, jogo_lugar, fields)  {
        if(error) throw error;      

        res.render('jogo',{jogo_lugar:jogo_lugar});
    });
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
        Caixinha:req.body.caixinha
    };

    connection.query("INSERT INTO MODALIDADE SET ?", nova_mod, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(nova_mod);
});

// Criar endereço
app.post('/novo_endereco', function(req, res) {
    console.log("entrou em /novo_endereco");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var novo_lugar = {
        //foto: img_name,
        Nome: req.body.nome_local,
        Rua: req.body.rua,
        Numero:req.body.numero
    };

    connection.query("INSERT INTO LUGAR SET ?", novo_lugar, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(novo_lugar);
});


// Criar jogo
app.post('/novo_jogo', function(req, res) {
    console.log("entrou em /novo_jogo");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var novo_jogo = {
        //foto: img_name,
        Nome_Mod: req.body.modalidade,
        ID_Lugar: req.body.lugar,
        Adversario: req.body.adversario,
        Horario: req.body.horario
    };

    connection.query("INSERT INTO JOGO SET ?", novo_jogo, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(novo_jogo);
});

// Criar treino
app.post('/novo_treino', function(req, res) {
    console.log("entrou em /novo_treino");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var novo_treino = {
        //foto: img_name,
        Nome_Mod: req.body.modalidade,
        ID_Lugar: req.body.lugar,
        Dia: req.body.dia,
        Horario: req.body.horario
    };

    connection.query("INSERT INTO TREINO SET ?", novo_treino, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(novo_treino);
});

// Criar atleta
app.post('/novo_atleta', function(req, res) {
    console.log("entrou em /novo_atleta");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var novo_atleta = {
        //foto: img_name,
        Matricula: req.body.matricula,
        Nome: req.body.nome,
        Curso: req.body.curso,
        Genero: req.body.genero,
    };

    connection.query("INSERT INTO ATLETA SET ?", novo_atleta, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(novo_atleta);
});

// Gerencia atleta
app.post('/gerencia_atletas', function(req, res) {
    console.log("entrou em /gerencia_atletas");

    var atl_mod = {
        //foto: img_name,
        Matricula: req.body.matricula,
        Nome_Mod: req.body.modalidade
    };

    connection.query("INSERT INTO ATLETA_MODALIDADE SET ?", atl_mod, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(atl_mod);
});

// Criar tecnico
app.post('/novo_tecnico', function(req, res) {
    console.log("entrou em /novo_tecnico");
    
    //se formos colocar fotos
    //var file = req.files.foto;
    //var img_name=file.name;

    var novo_tecnico = {
        //foto: img_name,
        Nome: req.body.nome,
    };

    connection.query("INSERT INTO TECNICO SET ?", novo_tecnico, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });

console.log(novo_tecnico);
});

// Gerencia tecnicos
app.post('/gerencia_tecnicos', function(req, res) {
    console.log("entrou em /gerencia_tecnicos");

    var tec_mod = {
        //foto: img_name,
        ID_Tecnico: req.body.id_tecnico,
        Nome_Mod: req.body.modalidade,
        Salario: req.body.salario
    };

    connection.query("INSERT INTO TREINADOR_MOD SET ?", tec_mod, function (error, results, fields) {   
        if (error) throw error;
        res.redirect('/');
    });


});

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!')
})
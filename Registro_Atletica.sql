DROP DATABASE IF EXISTS atletica;
CREATE DATABASE atletica;
USE atletica;

CREATE TABLE ATLETA (
	Matricula INTEGER NOT NULL,
    Nome VARCHAR(30) NOT NULL,
    Curso VARCHAR(20) NOT NULL,
    Genero VARCHAR(10) NULL,
    Imagem blob NULL,
    CHECK (Genero = 'Masculino' OR Genero = 'Feminino'),
    Socio BOOLEAN NOT NULL
);

ALTER TABLE ATLETA
    ADD PRIMARY KEY (Matricula);
    
CREATE TABLE MODALIDADE (
	Nome VARCHAR(30) NOT NULL,
    Genero VARCHAR(10) NOT NULL,
    CHECK (Genero = 'Masculino' OR Genero = 'Feminino'),
    Caixinha VARCHAR(5) NULL
);

ALTER TABLE MODALIDADE
    ADD PRIMARY KEY (Nome,Genero);

CREATE TABLE TECNICO (
	ID_Tecnico INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NULL
);

-- ALTER TABLE TECNICO
-- 	ADD PRIMARY KEY (ID_Tecnico);
    
CREATE TABLE LUGAR (
	ID_Lugar INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(30) NULL,
    Rua VARCHAR(50) NULL,
    Numero INTEGER NULL
);


-- ALTER TABLE LUGAR
-- 	ADD PRIMARY KEY(ID_Lugar);
    
CREATE TABLE ATLETA_MODALIDADE (
	Nome_Mod VARCHAR(30) NOT NULL,
    Genero_Mod VARCHAR(10) NOT NULL,
    Matricula_Atl INTEGER NOT NULL,
    Frequencia INTEGER NULL,
    Jogos INTEGER NULL,
    Caixinha_Paga BOOLEAN NOT NULL
);


ALTER TABLE ATLETA_MODALIDADE
	ADD PRIMARY KEY(Nome_Mod,Genero_Mod,Matricula_Atl);
    
ALTER TABLE ATLETA_MODALIDADE
    ADD FOREIGN KEY(Nome_Mod, Genero_Mod)
		REFERENCES MODALIDADE(Nome, Genero);

        
ALTER TABLE ATLETA_MODALIDADE
	ADD FOREIGN KEY(Matricula_Atl)
		REFERENCES ATLETA(Matricula);
        
	-- ADD FOREIGN KEY(Jogos)
	-- 	REFERENCES JOGOS_TREINO(ID_Jogo);
CREATE TABLE JOGO (
	Nome_Mod VARCHAR(30) NULL,
    Genero_Mod VARCHAR(10) NOT NULL,
    ID_Lugar INTEGER NOT NULL,
    Horario TIMESTAMP NULL,
    Adversario VARCHAR(30), 
    ID_Jogo INTEGER NOT NULL 
);



ALTER TABLE JOGO
	ADD PRIMARY KEY (Nome_Mod,Genero_Mod,ID_Lugar);
    
    

        
ALTER TABLE JOGO
    ADD FOREIGN KEY(Nome_Mod, Genero_Mod)
		REFERENCES MODALIDADE(Nome, Genero);
        
        
ALTER TABLE JOGO
	ADD FOREIGN KEY (ID_Lugar)
		REFERENCES LUGAR(ID_Lugar);
-- ALTER TABLE JOGOS_TREINO


CREATE TABLE TREINO (
	ID_Treino INTEGER NOT NULL,
	Nome_Mod VARCHAR(30) NOT NULL,
    Genero_Mod VARCHAR(10) NOT NULL,
    ID_Lugar INTEGER NOT NULL,
    Horario TIMESTAMP NULL
);

ALTER TABLE TREINO
	ADD PRIMARY KEY (Nome_Mod,Genero_Mod,ID_Lugar);
    
    

        
ALTER TABLE TREINO
    ADD FOREIGN KEY(Nome_Mod, Genero_Mod)
		REFERENCES MODALIDADE(Nome, Genero);
        
        
ALTER TABLE TREINO
	ADD FOREIGN KEY (ID_Lugar)
		REFERENCES LUGAR(ID_Lugar);


CREATE TABLE TREINADOR_MOD (
	Nome_Mod varchar(30) NOT NULL,
    Genero_Mod VARCHAR(10) NOT NULL,
    ID_Tecnico INTEGER NOT NULL,
    Salario INTEGER NULL
);

ALTER TABLE TREINADOR_MOD
	ADD PRIMARY KEY (Nome_Mod,Genero_Mod,ID_Tecnico);
    
ALTER TABLE TREINADOR_MOD
	ADD FOREIGN KEY (Nome_Mod,Genero_Mod)
		REFERENCES MODALIDADE(Nome,Genero);
        

ALTER TABLE TREINADOR_MOD
	ADD FOREIGN KEY (ID_Tecnico)
		REFERENCES TECNICO(ID_Tecnico);
        
        
CREATE TABLE STAT (
	Matricula INTEGER NOT NULL,
    ID_Treino INTEGER NOT NULL,
    Pesenca INTEGER NULL
);

ALTER TABLE STAT
	ADD PRIMARY KEY (Matricula,ID_Treino);

    
ALTER TABLE STAT
	ADD FOREIGN KEY (Matricula)
		REFERENCES ATLETA(Matricula);
        
-- ALTER TABLE STAT
-- 	ADD FOREIGN KEY (ID_Treino)
-- 		REFERENCES TREINO(ID_Treino);
        
        
-- ALTER TABLE STAT
-- 	ADD FOREIGN KEY (ID_Jogo)
-- 		REFERENCES JOGOS_TREINO(ID_Jogo);


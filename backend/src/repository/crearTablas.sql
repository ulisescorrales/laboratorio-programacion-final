START TRANSACTION;
SET NAMES 'utf8mb4';
DROP DATABASE IF EXISTS laBarbeer;
CREATE DATABASE laBarbeer;
USE laBarbeer;
CREATE TABLE Barberia(
    razon_social VARCHAR(100) PRIMARY KEY,
    ciudad VARCHAR(100),
    calle VARCHAR(100),
    nro_calle INT,
    telefono VARCHAR(20)
);
CREATE TABLE Barbero (
    nro_documento VARCHAR(10),
    tipo_doc VARCHAR(3) CHECK (tipo_doc IN ('DNI', 'LC', 'LE')),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    foto VARCHAR(200),  -- ruta de la imagen
    razon_social VARCHAR(100),
    PRIMARY KEY (nro_documento, tipo_doc),
    FOREIGN KEY (razon_social) REFERENCES Barberia(razon_social)
);
CREATE TABLE Servicio(
    nombre_servicio VARCHAR(100) PRIMARY KEY,
    duracion_estimada_min INT,
    precio_pesos INT,
    razon_social VARCHAR(100),
    FOREIGN KEY (razon_social) REFERENCES Barberia(razon_social)
);
CREATE TABLE Especializa_en(
    razon_social VARCHAR(100),
    nro_documento VARCHAR(10),
    tipo_doc VARCHAR(3),
    PRIMARY KEY (razon_social,nro_documento,tipo_doc),
    FOREIGN KEY (razon_social) REFERENCES Barberia(razon_social),
    FOREIGN KEY (nro_documento,tipo_doc) REFERENCES Barbero(nro_documento,tipo_doc)
);
CREATE TABLE Horario(
    hora_inicio TIME,
    hora_fin TIME,
    dia VARCHAR(10) CHECK (dia IN ('lunes','martes','miércoles','jueves','viernes','sabado','domingo')),
    PRIMARY KEY (hora_inicio,hora_fin,dia)
-- Al insertar, verificar si ya existe el horario ingresado
);
CREATE TABLE Trabaja_cuando(
    nro_documento VARCHAR(10),
    tipo_doc VARCHAR(3),
    hora_inicio TIME,
    hora_fin TIME,
    dia VARCHAR(10),
    PRIMARY KEY(nro_documento,tipo_doc,hora_inicio,hora_fin,dia),
    FOREIGN KEY (nro_documento,tipo_doc) REFERENCES Barbero(nro_documento,tipo_doc),
    FOREIGN KEY (hora_inicio,hora_fin,dia) REFERENCES Horario(hora_inicio,hora_fin,dia)
); 
COMMIT;
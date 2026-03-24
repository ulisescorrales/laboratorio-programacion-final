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
------------------------Nuevo
--Usuarios y roles
CREATE TABLE rol(nombre_rol VARCHAR(20),PRIMARY KEY (nombre_rol));
CREATE TABLE usuario(nombre_usuario VARCHAR(100),hash VARCHAR(60), PRIMARY KEY(nombre_usuario));
CREATE TABLE usuario_rol(nombre_usuario VARCHAR(100) , nombre_rol VARCHAR(20),PRIMARY KEY (nombre_usuario,nombre_rol), FOREIGN KEY (nombre_usuario) REFERENCES usuario(nombre_usuario),FOREIGN KEY (nombre_rol) REFERENCES rol(nombre_rol));
--Roles iniciales
INSERT INTO rol VALUES ('normal'),('admin')

CREATE TABLE cerveza (
    nombre_cerveza VARCHAR(100) PRIMARY KEY,
    descripcion VARCHAR (255) NOT NULL,
    marca VARCHAR(100) DEFAULT NULL,
    precio INT NOT NULL,
    promocion VARCHAR(100) DEFAULT NULL,
    pathImagen VARCHAR(255) NOT NULL
);
CREATE TABLE corte (
    nombre_cerveza VARCHAR(100) PRIMARY KEY,
    descripcion VARCHAR (255) NOT NULL,
    marca VARCHAR(100) DEFAULT NULL,
    precio INT NOT NULL,
    promocion VARCHAR(100) DEFAULT NULL,
    pathImagen VARCHAR(255) NOT NULL
);
INSERT INTO corte  VALUES
(
  'Corte Clásico',
  'Corte tradicional y prolijo, ideal para quienes buscan un look formal y atemporal. Se trabaja principalmente con tijera y terminaciones limpias.',
  NULL,
  10000,
  NULL,
  '/images/cortes/corte1.jpg'
),
(
  'Corte a tijera',
  'Corte realizado íntegramente con tijera, logrando un acabado natural, con volumen y movimiento.',
  NULL,
  12000,
  NULL,
  '/images/cortes/corte2.jpg'
),
(
  'Corte + afeitada',
  'Todo el cabello al mismo largo, ofreciendo un estilo simple y uniforme.',
  NULL,
  15000,
  NULL,
  '/images/cortes/corte3.jpg'
),
(
  'Estilo urbano',
  'Corte sencillo y práctico, fácil de mantener, ideal para niños y adolescentes.',
  NULL,
  11000,
  NULL,
  '/images/cortes/corte4.jpg'
);
INSERT INTO cerveza VALUES
(
  'Copa de Kuruf',
  'Una copa de kuruf tradicional',
  'kuruf',
  2000,
  NULL,
  '/images/cervezas/kuruf1.jpg'
),
(
  'Kuruf edición verano',
  'Cerveza rubia para refrezcarse',
  'kuruf',
  2500,
  NULL,
  '/images/cervezas/kuruf2.jpg'
),
(
  'Kuruf invernal',
  'Cerveza refrezcante',
  'kuruf',
15000,
  NULL,
  '/images/cervezas/kuruf3.jpg'
),
(
  'Kuruf negra',
  'Verión negra para deleitar',
  'kuruf',
  3000,
  NULL,
  '/images/cervezas/kuruf4.jpg'
),
(
  'Edición Yellow',
  'Edición limitada con sabor agregado',
  'kuruf',
  3400,
  NULL,
  '/images/cervezas/kuruf5.jpg'
),
(
  'Edición Limay',
  'Cerveza con agregado de limón',
  'kuruf',
  4000,
  NULL,
  '/images/cervezas/kuruf6.jpg'
),
(
  'Edición marítima',
  'Edición limitada para tomar en la playa',
  'kuruf',
  3200,
  NULL,
  '/images/cervezas/kuruf7.jpg'
);


 INSERT INTO usuario_rol VALUES('ulisescorrales','admin')
ALTER TABLE corte ADD COLUMN nro_secuencia INT NOT NULL AUTO_INCREMENT,ADD UNIQUE (nro_secuencia);
ALTER TABLE cerveza ADD COLUMN nro_secuencia INT NOT NULL AUTO_INCREMENT,ADD UNIQUE (nro_secuencia);

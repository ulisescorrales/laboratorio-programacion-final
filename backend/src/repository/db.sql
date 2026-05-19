-- MySQL dump 10.13  Distrib 9.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: LaBarBeer
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cerveza`
--

DROP TABLE IF EXISTS `cerveza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cerveza` (
  `nombre_cerveza` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `precio` int NOT NULL,
  `pathImagen` varchar(255) NOT NULL,
  `nro_secuencia` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`nombre_cerveza`),
  UNIQUE KEY `nro_secuencia` (`nro_secuencia`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cerveza`
--

LOCK TABLES `cerveza` WRITE;
/*!40000 ALTER TABLE `cerveza` DISABLE KEYS */;
INSERT INTO `cerveza` VALUES ('Copa de Kuruf','Una copa de kuruf tradicional','kuruf',2000,'/images/cervezas/kuruf1.jpg',2),('Edición Lima','Cerveza con agregado de limón','kuruf',4000,'/images/cervezas/kuruf6.jpg',3),('Edición marítima','Edición limitada para tomar en la playa','kuruf',3200,'/images/cervezas/kuruf7.jpg',4),('Edición Yellow','Edición limitada con sabor agregado','kuruf',3400,'/images/cervezas/kuruf5.jpg',5),('Irish Bee','Contamos con amplia variedad de la marca','Ratsel',500,'/images/cervezas/1774540316643-1d4b0d85-ca6c-424d-871c-a2fc8b45e7cf.jpeg',13),('Sullerica rubia/negra','Cerveza neuquina','Sullerica',3000,'/images/cervezas/1774540397097-d0f8f74b-ec44-4c42-87ec-8ffda959ee99.png',14);
/*!40000 ALTER TABLE `cerveza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corte`
--

DROP TABLE IF EXISTS `corte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corte` (
  `nombre_corte` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `precio` int NOT NULL,
  `pathImagen` varchar(255) NOT NULL,
  `nro_secuencia` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`nombre_corte`),
  UNIQUE KEY `nro_secuencia` (`nro_secuencia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corte`
--

LOCK TABLES `corte` WRITE;
/*!40000 ALTER TABLE `corte` DISABLE KEYS */;
INSERT INTO `corte` VALUES ('Corte Clásico','Corte tradicional y prolijo, ideal para quienes buscan un look formal y atemporal. Se trabaja principalmente con tijera y terminaciones limpias.',NULL,10000,'/images/cortes/1779155478306-4d82e0a6-c2ac-4bab-9ecf-3678997f3622.jpeg',4),('Estilo urbano','Corte sencillo y práctico, fácil de mantener, ideal para niños y adolescentes.',NULL,11000,'/images/cortes/corte4.jpg',5);
/*!40000 ALTER TABLE `corte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `introduccion`
--

DROP TABLE IF EXISTS `introduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `introduccion` (
  `id` int NOT NULL,
  `bienvenida` varchar(1000) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `calle` varchar(250) DEFAULT NULL,
  `nro_calle` varchar(5) DEFAULT NULL,
  `horario` varchar(210) DEFAULT NULL,
  `latitud` varchar(10) DEFAULT NULL,
  `longitud` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `introduccion`
--

LOCK TABLES `introduccion` WRITE;
/*!40000 ALTER TABLE `introduccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `introduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `nombre_rol` varchar(20) NOT NULL,
  PRIMARY KEY (`nombre_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES ('admin'),('normal');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `nombre_usuario` varchar(100) NOT NULL,
  `hash` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`nombre_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('admin','$2b$10$VWvjV8JruLUn6z4urex13OdPkNJEYertlcB4Q1P0KItxQY.Yx3G6C'),('normal','$2b$10$fgrpHZHx49io6cWasVxIkO1DsgA.lxO8UlAU9dH97uAzDaTk6S4ea'),('ulisescorrales','$2b$10$8CIplcAkR2AVEs4yvkwPh.cYyVh5/hErlxDBtVYYsQPioAVOQYrX6');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `nombre_usuario` varchar(100) NOT NULL,
  `nombre_rol` varchar(20) NOT NULL,
  PRIMARY KEY (`nombre_usuario`,`nombre_rol`),
  KEY `nombre_rol` (`nombre_rol`),
  CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`nombre_usuario`) REFERENCES `usuario` (`nombre_usuario`),
  CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`nombre_rol`) REFERENCES `rol` (`nombre_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES ('admin','admin'),('ulisescorrales','admin'),('normal','normal');
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-18 23:17:04

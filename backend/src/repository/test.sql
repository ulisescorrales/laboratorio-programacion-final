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
  `promocion` varchar(100) DEFAULT NULL,
  `pathImagen` varchar(255) NOT NULL,
  PRIMARY KEY (`nombre_cerveza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cerveza`
--

LOCK TABLES `cerveza` WRITE;
/*!40000 ALTER TABLE `cerveza` DISABLE KEYS */;
INSERT INTO `cerveza` VALUES ('Copa de Kuruf','Una copa de kuruf tradicional','kuruf',2000,NULL,'/images/cervezas/kuruf1.jpg'),('Edición Limay','Cerveza con agregado de limón','kuruf',4000,NULL,'/images/cervezas/kuruf6.jpg'),('Edición marítima','Edición limitada para tomar en la playa','kuruf',3200,NULL,'/images/cervezas/kuruf7.jpg'),('Edición Yellow','Edición limitada con sabor agregado','kuruf',3400,NULL,'/images/cervezas/kuruf5.jpg'),('Kuruf edición verano','Cerveza rubia para refrezcarse','kuruf',2500,NULL,'/images/cervezas/kuruf2.jpg'),('Kuruf invernal','Cerveza refrezcante','kuruf',15000,NULL,'/images/cervezas/kuruf3.jpg'),('Kuruf negra','Verión negra para deleitar','kuruf',3000,NULL,'/images/cervezas/kuruf4.jpg');
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
  `promocion` varchar(100) DEFAULT NULL,
  `pathImagen` varchar(255) NOT NULL,
  PRIMARY KEY (`nombre_corte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corte`
--

LOCK TABLES `corte` WRITE;
/*!40000 ALTER TABLE `corte` DISABLE KEYS */;
INSERT INTO `corte` VALUES ('Corte + afeitada','Todo el cabello al mismo largo, ofreciendo un estilo simple y uniforme.',NULL,15000,NULL,'/images/cortes/corte3.jpg'),('Corte a tijera','Corte realizado íntegramente con tijera, logrando un acabado natural, con volumen y movimiento.',NULL,12000,NULL,'/images/cortes/corte2.jpg'),('Corte Clásico','Corte tradicional y prolijo, ideal para quienes buscan un look formal y atemporal. Se trabaja principalmente con tijera y terminaciones limpias.',NULL,10000,NULL,'/images/cortes/corte1.jpg'),('Estilo urbano','Corte sencillo y práctico, fácil de mantener, ideal para niños y adolescentes.',NULL,11000,NULL,'/images/cortes/corte4.jpg');
/*!40000 ALTER TABLE `corte` ENABLE KEYS */;
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
INSERT INTO `usuario` VALUES ('ulisescorrales','$2b$10$8CIplcAkR2AVEs4yvkwPh.cYyVh5/hErlxDBtVYYsQPioAVOQYrX6');
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
INSERT INTO `usuario_rol` VALUES ('ulisescorrales','admin');
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

-- Dump completed on 2026-03-14 20:32:23

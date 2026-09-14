-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: projeto_manicure
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `profissional_id` int NOT NULL,
  `cliente_id` int NOT NULL,
  `servico_id` int NOT NULL,
  `data_hora` datetime(6) NOT NULL,
  `valor` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profissional_id` (`profissional_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `servico_id` (`servico_id`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`),
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `agendamentos_ibfk_3` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (3,'AGENDADO',NULL,1,1,6,'2026-09-11 10:00:00.000000',NULL),(12,'CONCLUIDO',NULL,1,1,6,'2026-09-10 13:00:00.000000',80),(35,'CONCLUIDO',NULL,3,25,14,'2026-09-12 15:00:00.000000',40),(36,'CONCLUIDO',NULL,3,25,16,'2026-09-12 16:00:00.000000',35),(40,'CONFIRMADO',NULL,3,34,10,'2026-09-19 15:00:00.000000',120),(42,'AGENDADO',NULL,3,22,15,'2026-09-14 14:00:00.000000',75);
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_profissional`
--

DROP TABLE IF EXISTS `cliente_profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_profissional` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `profissional_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cliente_profissional` (`cliente_id`,`profissional_id`),
  KEY `FKoib3ankn39d3r4e8fu5t3u528` (`profissional_id`),
  CONSTRAINT `FKoib3ankn39d3r4e8fu5t3u528` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`),
  CONSTRAINT `FKphnfg8s7an4ydpsd2yxvc3wqr` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_profissional`
--

LOCK TABLES `cliente_profissional` WRITE;
/*!40000 ALTER TABLE `cliente_profissional` DISABLE KEYS */;
INSERT INTO `cliente_profissional` VALUES (1,1,1),(17,12,1),(19,19,3),(23,22,3),(26,25,3),(27,26,3),(28,27,3),(29,28,3),(30,29,3),(31,30,3),(32,31,3),(33,32,3),(34,33,3),(35,34,3);
/*!40000 ALTER TABLE `cliente_profissional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `observacoes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Maria','11999999999','maria@gmail.com',NULL),(12,'joana','11911111111','joana@gmail.com',NULL),(19,'Betinhaa','11992346759','elizabeth@gmail.com',NULL),(22,'Nayara    ','11994877462','naiara@gmail.com',NULL),(25,'Luciane ','11964958562','luciane@gmail.com',NULL),(26,'Rebeca ','22992587485','rebeca@gmail.com',NULL),(27,'Amandinha','11942437177','amandinha@gmail.com',NULL),(28,'Val Renner','11995161235','val@gmail.com',NULL),(29,'Gabriella','11953442149','gabriella@gmail.com',NULL),(30,'Janaina','11942427492','janaina@gmail.com',NULL),(31,'Ana Carol','11981122689','anacarol@gmail.com',NULL),(32,'Katia ','11948065019','katia@gmail.com',NULL),(33,'Fernanda','11997382814','fernanda@gmail.com',NULL),(34,'Thais Soares','11986424792','thais@gmail.com',NULL);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `despesas`
--

DROP TABLE IF EXISTS `despesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `despesas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor` double NOT NULL,
  `profissional_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKao9herlim7lryad7uhxryq9x9` (`profissional_id`),
  CONSTRAINT `FKao9herlim7lryad7uhxryq9x9` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `despesas`
--

LOCK TABLES `despesas` WRITE;
/*!40000 ALTER TABLE `despesas` DISABLE KEYS */;
INSERT INTO `despesas` VALUES (4,'Teste','2026-09-10','Teste de segurança',50,1),(15,'Materiais','2026-09-13','Gel',38,3),(16,'Aluguel ','2026-09-01','Salão ',600,3);
/*!40000 ALTER TABLE `despesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valor` double NOT NULL,
  `forma_pagamento` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `data_pagamento` date DEFAULT NULL,
  `agendamento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `agendamento_id` (`agendamento_id`),
  CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profissionais`
--

DROP TABLE IF EXISTS `profissionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissionais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `perfil` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `link_publico` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissionais`
--

LOCK TABLES `profissionais` WRITE;
/*!40000 ALTER TABLE `profissionais` DISABLE KEYS */;
INSERT INTO `profissionais` VALUES (1,'Fernanda lima','fernanda@gmail.com','$2a$10$zTufsd53psBE5fc8lXc8oOyV1Hd2TheuIcugvhd.XmOVagjipWDuy','11988888888','PROFISSIONAL',NULL,'fernanda-lima'),(3,'Taluama Barros Soares ','taluamabarros@gmail.com','$2a$10$8YaHpn76Lz9fyYvW3JkGoOmj4qYOpIbqjqkd3IY1uAZmdepH4Tqsi','11978256021','PROFISSIONAL','/uploads/perfis/65042ae2-3cfd-4036-888e-f800d7673362_WhatsApp Image 2026-09-09 at 21.38.58.jpeg','taluama-barros-soares');
/*!40000 ALTER TABLE `profissionais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `preco` double NOT NULL,
  `duracao` int NOT NULL,
  `profissional_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe2qaj08hhpjpp9ho360m4jfxh` (`profissional_id`),
  CONSTRAINT `FKe2qaj08hhpjpp9ho360m4jfxh` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES (6,'Alongamento de unhas',NULL,100,120,1),(9,'Alongamentos (tips, fibra de vidro, fibra em poliéster, Molde F1)',NULL,150,180,3),(10,'Manutenção',NULL,120,120,3),(12,'Pé tradicional',NULL,45,180,3),(13,'Plástica dos pés',NULL,85,180,3),(14,'Manicure tradicional',NULL,30,60,3),(15,'Esmaltação em gel',NULL,75,60,3),(16,'Esmaltação em gel nos pés',NULL,75,60,3),(18,'Banho de gel em unhas naturais',NULL,85,120,3);
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-14 12:15:35

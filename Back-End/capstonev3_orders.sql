-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: capstonev3
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_number` int NOT NULL AUTO_INCREMENT,
  `date_ordered` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` double NOT NULL,
  `address_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `total_quantity` int NOT NULL,
  PRIMARY KEY (`order_number`),
  KEY `FKhlglkvf5i60dv6dn397ethgpt` (`address_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKhlglkvf5i60dv6dn397ethgpt` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2022-11-10 11:14:01.304000','shipped',349.71,3,1,0),(2,'2022-11-10 12:01:42.718000','delivered',249.89999999999998,4,3,0),(3,'2022-12-01 11:33:15.957000','delivered',249.89999999999998,22,35,10),(4,'2022-12-01 11:43:30.588000','shipped',76.97,22,35,3),(5,'2022-12-01 11:49:18.506000','delivered',75.91,22,35,5),(6,'2022-12-01 11:50:06.750000','delivered',39.94,22,35,2),(7,'2022-12-08 13:10:13.455000','ordered',336.85,21,1,15),(8,'2022-12-08 13:12:10.752000','ordered',1035.96,3,1,4),(9,'2022-12-08 13:16:03.485000','ordered',115.86,3,1,6),(10,'2022-12-08 15:12:48.581000','ordered',100.89999999999999,17,3,6),(11,'2022-12-08 15:59:05.016000','ordered',20,26,38,2),(12,'2022-12-08 16:28:49.001000','ordered',39.94,27,39,2),(13,'2022-12-09 12:31:00.206000','ordered',25.99,25,3,1),(14,'2022-12-09 12:31:33.566000','ordered',50.98,18,3,2),(15,'2022-12-09 16:43:46.737000','ordered',11.99,28,42,1),(16,'2022-12-09 16:47:05.665000','ordered',34.989999999999995,17,3,2),(17,'2022-12-12 14:01:11.234000','ordered',39.94,21,1,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-12 16:07:28

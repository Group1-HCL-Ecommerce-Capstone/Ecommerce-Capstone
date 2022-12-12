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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vg@email.com','Veronica','Gutierrez','$2a$10$Kh1kn6LtoeIX2s51lqb8iOC2MoQXlfP41qRGdMCZQcQ2RhkgOHo9y'),(3,'user@email.com','Hugh','Zur','$2a$10$ZDD.uAUBk0e8QcBNnmlJ5eDdm7o9QsgzJk.xmcW6ZQEOUro/rNAFC'),(5,'abc@email.com','A','B','$2a$10$eXRLG0ZRRACLUGbycgcmvu.C3o.IL.OIqZuw34Nisn1jyPjSqFLtq'),(6,'new@new.com','new','test','$2a$10$sAy3U9I8yjAWVQwVJONTkuty.UUDLxZ09DMnYSL1fYln/bNSNdpfm'),(7,'rp@email.com','Rachel','Pines','$2a$10$Bc4.cTkwF7uvtdilIptjiOc8FX5JCJM8VojjJ8zsR70uNcPig924W'),(8,'great@email.com','G','Reat','$2a$10$kjUZmC4.hxFTaLmAq2KFBOu5IyjsYCMJlVKPTs80fDhUstdWHyjce'),(9,'mt@email.com','mike','towers','$2a$10$EzcRmyBXdnLC6BA1yovaBeWvnwJYciBP2NsTGY9w4Ui3V4URXbnRK'),(10,'ju@email.com','james','ultra','$2a$10$X2eX1jiPNNsopNcRgzD53ePzMA4VBV2xD2hgxoqfOvb3djaTXctWi'),(11,'nc@email.com','Nick','Clause','$2a$10$Qpsy7E8gsZ6zY1LugV6Zjutb4r2aeYqE1fKLu73bSx6k4Nlc.oIYS'),(12,'km@email.com','Kyle','Moon','$2a$10$kbSklsQJoywcoaHf8PFFl.z0IRlqrwB58yGLv9T0h4y.5ENjzrpJG'),(13,'lr@email.com','Lila','Rose','$2a$10$bTqDY7H/U3QiY2tJ1a5wwOkfY5ixnlcWefEdYTUKX2lf40YsDDgsC'),(14,'gw@email.com','Grace','Winters','$2a$10$YDSpdvrPvV1OV3cMuW8nR.kOH85vGNTCda6dc3XBEcci6b7plLXJS'),(15,'ph@gmail.com','Patty','Healy','$2a$10$iU2rU/iPgBHgjI3t0nFkjOpK.0OwmIgiBHL9vEEZAlvRf7Fvw/1LW'),(16,'hp@email.com','Harry','Potts','$2a$10$zNrwX4TcidL6a/KPqeiaMeVioUAQN96ey9mjWPNB0htn6tpj7iMRu'),(17,'md@email.com','Mickey','Dees','$2a$10$Ku8SwxzL7BPla5LWI3dbUOYJTBYvoEALyB.aWbaqrQZZdN6G.Wg5m'),(18,'ql@email.com','Quinn','Litch','$2a$10$gk1SicVFl1PUUrPeEijkpeGVYvUAzMVo51epAQhFE4Fw8lPjIz0LK'),(20,'yq@email.com','Yvette','Quinones','$2a$10$1n1S8M83ZmdSxkB6YNMmQublPHQznI9TQ2cYdVl.T0.2uVq.4RlHO'),(25,'jakeh@email.com','Jake','Healy','$2a$10$ge.q9W0QOw52vfaQjdLd0uZ1o1I7TEs3VR6sSWOiMNBhxv4.TmDs2'),(26,'admin@email.com','Admin','User','$2a$10$Rowd7GmAU531h9jx9YMJ1exAFqSoeLfAfrHU7uDExb6K7S18fqAdi'),(27,'gregv@email.com','Greg','Vogel','$2a$10$ENCTQSQJqshwWZtMlj7Lfu1y3DaYv0bUzcxvBq6sBcaBhF4x.SV6e'),(35,'brandnew@email.com',NULL,NULL,NULL),(36,'test@email.com',NULL,NULL,NULL),(37,'krky@email.com','Kris','Kyle','$2a$10$RmTSFrvQ8fPJPIsa4xN9xulamWIIjC8uTPIIz1D7zEi9315pBIG0y'),(38,'oktanew@email.com',NULL,NULL,NULL),(39,'fj@email.com','Fiona','Jackson','$2a$10$zv0BTnpr0nf970famVp52O00YeXGv6V1muJ7YonBsr4rGG7yMBkc.'),(42,'oq@email.com','o','q','$2a$10$sjGArnUnMHlpQ/D8tjhGOOKtI0if1zZQIEx9i30nVPN5fLCexYMGW');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-12 16:07:04

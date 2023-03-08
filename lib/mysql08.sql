-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mcs
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clubs` (
  `tid` int(3) NOT NULL,
  `cid` int(3) NOT NULL AUTO_INCREMENT,
  `cname` char(40) NOT NULL,
  PRIMARY KEY (`cid`,`tid`) USING BTREE,
  KEY `tournament id` (`tid`),
  CONSTRAINT `tournament id` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (2,1,'MCS Schriesheim'),(2,2,'Heidelberg'),(2,5,'Hirschberg'),(2,10,'Mannheim'),(2,31,'Mannheim Lindenhof'),(2,40,'Viernheim'),(2,44,'Hannover 96'),(1,47,'MCS Schriesheim'),(3,76,'Weinheim'),(3,77,'test'),(1,78,'Heidelberg'),(1,79,'Mannheim'),(1,80,'Hirschberg'),(1,81,'Leutershausen'),(5,83,'test');
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comptypes`
--

DROP TABLE IF EXISTS `comptypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comptypes` (
  `id` int(1) NOT NULL,
  `description` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comptypes`
--

LOCK TABLES `comptypes` WRITE;
/*!40000 ALTER TABLE `comptypes` DISABLE KEYS */;
INSERT INTO `comptypes` VALUES (1,'Mannschaft'),(2,'Einzel'),(3,'Mannschaft + Einzel');
/*!40000 ALTER TABLE `comptypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupplayers`
--

DROP TABLE IF EXISTS `groupplayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupplayers` (
  `tid` int(3) NOT NULL,
  `groupid` int(11) NOT NULL,
  `playernumber` int(3) NOT NULL,
  `playerorder` int(3) DEFAULT NULL,
  PRIMARY KEY (`tid`,`groupid`,`playernumber`),
  KEY `tid` (`tid`,`playernumber`),
  CONSTRAINT `groupplayers_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`),
  CONSTRAINT `groupplayers_ibfk_2` FOREIGN KEY (`tid`, `playernumber`) REFERENCES `players` (`tid`, `playernumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupplayers`
--

LOCK TABLES `groupplayers` WRITE;
/*!40000 ALTER TABLE `groupplayers` DISABLE KEYS */;
INSERT INTO `groupplayers` VALUES (1,1,123,1),(1,1,147,2),(1,1,265,3),(1,2,452,2),(1,2,456,1),(1,2,458,3),(1,8,123,1),(1,14,471,1),(1,15,147,1);
/*!40000 ALTER TABLE `groupplayers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `tid` int(3) NOT NULL,
  `trackid` int(3) NOT NULL,
  `groupid` int(11) NOT NULL AUTO_INCREMENT,
  `grouporder` int(3) DEFAULT NULL,
  `currentgroup` int(1) DEFAULT 0,
  `mid` int(11) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  PRIMARY KEY (`tid`,`groupid`),
  UNIQUE KEY `groupid` (`groupid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,1,1,1,0,2,3),(1,1,2,2,0,2,3),(1,2,8,1,0,2,3),(1,1,14,3,0,2,3),(1,2,15,2,0,2,3);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchdays`
--

DROP TABLE IF EXISTS `matchdays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matchdays` (
  `tid` int(3) NOT NULL,
  `mdnumber` int(3) NOT NULL,
  `mddescription` char(40) NOT NULL DEFAULT '',
  `mdcurrent` int(1) DEFAULT 0,
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`mid`,`tid`,`mdnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchdays`
--

LOCK TABLES `matchdays` WRITE;
/*!40000 ALTER TABLE `matchdays` DISABLE KEYS */;
INSERT INTO `matchdays` VALUES (1,2,'Hallo',1,2),(1,3,'',0,3),(1,9,'',0,19),(1,10,'',0,24),(1,11,'',0,25);
/*!40000 ALTER TABLE `matchdays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `tid` int(3) NOT NULL,
  `cid` int(3) NOT NULL,
  `playernumber` int(3) NOT NULL,
  `gender` char(1) NOT NULL,
  `surname` char(20) NOT NULL,
  `firstname` char(20) NOT NULL,
  PRIMARY KEY (`tid`,`playernumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,78,123,'M','Alizadeh','Ramin'),(1,79,147,'W','Mueller','Walter'),(1,78,265,'M','hallo','hallo'),(1,79,452,'W','ehrmann','aniara'),(1,78,456,'t','test','test'),(1,47,458,'M','Alizadeh','Tim'),(1,79,471,'M','ehrmann','jasmin'),(1,80,621,'W','Hallo','Hallo'),(1,78,889,'A','Mueller','Max'),(1,79,999,'W','Alizadeh','Ramin'),(2,1,888,'M','Alizadeh','Ramin'),(5,83,111,'a','test','test'),(5,83,112,'t','test','test');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rounds`
--

DROP TABLE IF EXISTS `rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rounds` (
  `tid` int(3) NOT NULL,
  `rnumber` int(3) NOT NULL,
  `rdescription` char(40) NOT NULL DEFAULT '',
  `rcurrent` int(1) NOT NULL DEFAULT 0,
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL,
  PRIMARY KEY (`rid`,`tid`,`mid`,`rcurrent`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rounds`
--

LOCK TABLES `rounds` WRITE;
/*!40000 ALTER TABLE `rounds` DISABLE KEYS */;
INSERT INTO `rounds` VALUES (1,1,'',0,3,2),(1,2,'',0,4,2),(1,4,'',0,6,2),(1,2,'',0,12,3),(1,3,'',0,13,3),(1,4,'',0,14,3);
/*!40000 ALTER TABLE `rounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournaments` (
  `tid` int(3) NOT NULL AUTO_INCREMENT,
  `tname` char(20) NOT NULL,
  `tlocation` char(20) NOT NULL,
  `tactive` tinyint(1) NOT NULL,
  `tcurrent` int(1) DEFAULT 0,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES (1,'DM 2023','Monnem',1,1),(2,'DM 2022','Schriesheim',1,0),(3,'DM 2024','Hirschberg',1,0),(4,'DM 2025','Heidelberg',1,0),(5,'test','asd',1,0),(6,'testdel','del',1,0);
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tracks` (
  `tid` int(3) NOT NULL,
  `trackid` int(3) NOT NULL AUTO_INCREMENT,
  `currentgroup` int(2) DEFAULT NULL,
  `label` char(1) NOT NULL,
  `trackdescription` char(40) NOT NULL,
  PRIMARY KEY (`tid`,`trackid`),
  UNIQUE KEY `trackid` (`trackid`),
  CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,1,0,'A','Filz'),(1,2,0,'B','Minigolf'),(2,7,0,'a','test'),(2,8,0,'A','Filz'),(2,9,0,'A','Filz'),(5,26,NULL,'A','Test'),(5,27,NULL,'B','Filz');
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` char(20) NOT NULL,
  `userpassword` varchar(60) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('asd','$2y$10$jWrDiQtGqUoae8YGOO39fOoYdg5g5y3pGvlwjAsSpLSxFnjsywuQ6'),('ralizadeh','$2y$10$IthUcaqvb2jGe0Pu2K1NfekyPKAcRwB.yrzWpFk0DJiO6Yr6s4IJm');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-08 11:22:20

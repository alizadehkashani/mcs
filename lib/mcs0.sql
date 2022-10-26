-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mcs
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (2,1,'MCS Schriesheim'),(2,2,'Heidelberg'),(2,5,'Hirschberg'),(2,8,'Mannheim'),(2,9,'Mannheim'),(2,10,'Mannheim'),(2,11,'Mannheim'),(2,12,'Mannheim'),(2,13,'Mannheim'),(2,14,'Mannheim'),(2,15,'Mannheim'),(2,16,'Mannheim'),(2,17,'Mannheim'),(2,18,'Mannheim'),(2,19,'Mannheim'),(2,20,'Mannheim'),(2,21,'Mannheim'),(2,22,'Mannheim'),(2,23,'Mannheim'),(2,24,'Mannheim'),(2,25,'Mannheim'),(2,26,'Mannheim'),(2,27,'Mannheim'),(2,28,'Mannheim'),(2,29,'Mannheim'),(2,30,'Mannheim'),(2,31,'Mannheim Lindenhof'),(2,32,'Mannheim'),(2,33,'Mannheim'),(2,34,'Mannheim'),(2,35,'Mannheim'),(2,36,'Mannheim'),(2,37,'Mannheim'),(2,38,'Mannheim'),(2,40,'Viernheim'),(2,44,'Hannover 96'),(2,46,'Lindenhof'),(1,47,'MCS Schriesheim'),(3,76,'Weinheim'),(3,77,'test'),(1,78,'Heidelberg'),(1,79,'Mannheim'),(1,80,'Hirschberg'),(1,81,'Leutershausen');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `startorder` int(3) NOT NULL,
  `type` char(1) NOT NULL,
  `gender` char(1) NOT NULL,
  `track` char(1) NOT NULL,
  `startgroup` int(2) NOT NULL,
  `playerorder` int(1) NOT NULL,
  `player` int(1) NOT NULL,
  PRIMARY KEY (`startorder`,`track`,`startgroup`,`player`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'','','A',1,0,101),(1,'','','A',1,0,106),(1,'','','A',1,0,111),(1,'','','B',1,0,101),(1,'','','B',1,0,106),(1,'','','B',1,0,111),(2,'','','A',2,0,102),(2,'','','A',2,0,107),(2,'','','A',2,0,112),(2,'','','B',2,0,102),(2,'','','B',2,0,107),(2,'','','B',2,0,112),(3,'','','A',3,0,103),(3,'','','A',3,0,108),(3,'','','A',3,0,113),(3,'','','B',3,0,103),(3,'','','B',3,0,108),(3,'','','B',3,0,113),(4,'','','A',4,0,104),(4,'','','A',4,0,109),(4,'','','B',4,0,104),(4,'','','B',4,0,109),(5,'','','A',1,0,105),(5,'','','A',1,0,110),(5,'','','B',1,0,105),(5,'','','B',1,0,110);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indvgroups`
--

DROP TABLE IF EXISTS `indvgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indvgroups` (
  `startorder` int(2) NOT NULL,
  `comptype` char(1) NOT NULL,
  `gender` char(1) NOT NULL,
  `playerorder` int(1) NOT NULL,
  `player` int(3) NOT NULL,
  PRIMARY KEY (`startorder`,`comptype`,`gender`,`player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indvgroups`
--

LOCK TABLES `indvgroups` WRITE;
/*!40000 ALTER TABLE `indvgroups` DISABLE KEYS */;
INSERT INTO `indvgroups` VALUES (1,'1','D',0,101),(1,'1','D',1,103),(1,'1','D',2,112),(1,'1','H',0,222),(1,'1','H',2,234),(1,'1','H',1,237),(2,'1','D',0,108),(2,'1','D',1,113),(2,'1','D',2,119),(2,'1','H',1,207),(2,'1','H',2,216),(2,'1','H',0,250),(3,'1','D',0,104),(3,'1','D',2,109),(3,'1','D',1,115),(3,'1','H',0,223),(3,'1','H',1,238),(3,'1','H',2,240),(4,'1','D',2,105),(4,'1','D',0,114),(4,'1','D',1,120),(4,'1','H',1,209),(4,'1','H',2,217),(4,'1','H',0,251),(5,'1','D',1,110),(5,'1','D',0,116),(5,'1','D',2,235),(5,'1','H',0,225),(5,'1','H',1,239),(5,'1','H',2,243),(6,'1','D',2,111),(6,'1','D',1,117),(6,'1','D',0,304),(6,'1','H',1,210),(6,'1','H',2,218),(6,'1','H',0,252),(7,'1','D',0,307),(7,'1','D',1,308),(7,'1','H',0,226),(7,'1','H',1,241),(7,'1','H',2,245),(8,'1','H',1,213),(8,'1','H',2,219),(8,'1','H',0,253),(9,'1','H',0,227),(9,'1','H',1,242),(9,'1','H',2,246),(10,'1','H',0,214),(10,'1','H',1,220),(10,'1','H',2,228),(11,'1','H',0,244),(11,'1','H',1,247),(11,'1','H',2,301),(12,'1','H',0,221),(12,'1','H',1,229),(12,'1','H',2,306),(13,'1','H',1,302),(13,'1','H',2,305),(13,'1','H',0,309),(14,'1','H',1,303),(14,'1','H',0,310),(14,'1','H',2,311);
/*!40000 ALTER TABLE `indvgroups` ENABLE KEYS */;
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
  PRIMARY KEY (`tid`,`mdnumber`),
  CONSTRAINT `matchdays_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchdays`
--

LOCK TABLES `matchdays` WRITE;
/*!40000 ALTER TABLE `matchdays` DISABLE KEYS */;
INSERT INTO `matchdays` VALUES (1,1,'Gruppenphase',0),(1,2,'test',0),(1,3,'',0),(1,5,'test',0),(1,6,'',0),(2,1,'',0),(2,2,'',0),(2,3,'',1),(2,4,'',0),(2,5,'',0),(3,1,'',0),(4,1,'',0),(4,2,'',0),(5,1,'',0);
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
  PRIMARY KEY (`tid`,`cid`,`playernumber`),
  KEY `cid` (`cid`),
  CONSTRAINT `players_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`),
  CONSTRAINT `players_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `clubs` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,47,458,'M','Alizadeh','Tim'),(1,78,123,'M','Alizadeh','Ramin'),(1,78,456,'t','test','test'),(1,78,889,'A','Mueller','Max'),(1,79,147,'W','Mueller','Walter'),(1,79,999,'W','Alizadeh','Ramin'),(1,80,621,'W','Hallo','Hallo'),(2,1,888,'M','Alizadeh','Ramin');
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
  `mdnumber` int(3) NOT NULL,
  `rnumber` int(3) NOT NULL,
  `rdescription` char(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`tid`,`mdnumber`,`rnumber`),
  CONSTRAINT `rounds_ibfk_1` FOREIGN KEY (`tid`, `mdnumber`) REFERENCES `matchdays` (`tid`, `mdnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rounds`
--

LOCK TABLES `rounds` WRITE;
/*!40000 ALTER TABLE `rounds` DISABLE KEYS */;
INSERT INTO `rounds` VALUES (1,1,1,'halb finale'),(1,1,2,'halb finale'),(1,1,3,''),(1,1,4,''),(1,1,5,''),(1,2,1,'halb finale'),(2,1,1,''),(2,1,2,''),(2,2,1,''),(2,2,2,''),(2,2,3,''),(2,2,4,''),(2,2,5,''),(4,1,1,''),(4,1,2,''),(4,1,3,''),(4,2,1,''),(4,2,2,''),(5,1,1,'');
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
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES (1,'DM 2023','Monnem',1),(2,'DM 2022','Schriesheim',1),(3,'DM 2024','Hirschberg',1),(4,'DM 2025','Heidelberg',1),(5,'tr','asd',1);
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
  `currentgroup` int(2) NOT NULL,
  `label` char(1) NOT NULL,
  `trackdescription` char(40) NOT NULL,
  PRIMARY KEY (`tid`,`trackid`),
  UNIQUE KEY `trackid` (`trackid`),
  CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,1,0,'A','Filz'),(1,2,0,'B','Minigolf'),(1,23,0,'C','Golf'),(1,24,0,'D','Kinderbahn'),(2,7,0,'a','test'),(2,8,0,'A','Filz'),(2,9,0,'A','Filz');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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

-- Dump completed on 2022-10-26  9:36:09

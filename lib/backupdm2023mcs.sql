-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 15, 2023 at 09:37 PM
-- Server version: 10.3.32-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcs`
--

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

CREATE TABLE `clubs` (
  `tid` int(3) NOT NULL,
  `cid` int(3) NOT NULL,
  `cname` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`tid`, `cid`, `cname`) VALUES
(7, 85, '1. BGC Rodalben 1977 e.V.'),
(7, 86, '1. MGC Köln 1961 e.V.'),
(7, 87, '1. MGC Ludwigshafen 1964 e.V.'),
(7, 88, '1. MGC Mannheim 1968 e.V.'),
(7, 89, '1. MGC Peine von 1965 e.V.'),
(7, 90, '1. MGC Süßen e.V.'),
(7, 91, 'BGC Schloß Paffendorf e.V.'),
(7, 92, 'BGS Hardenberg-Pötter e.V.'),
(7, 93, 'BGSC \"Gut Schlag\" Gladbeck e.V.'),
(7, 94, 'BGSV Aßlar 1987 e.V.'),
(7, 95, 'BGSV Bad Homburg v.d.H. e.V.'),
(7, 96, 'BGSV Kerpen e.V.'),
(7, 97, 'BSV 86 München e.V.'),
(7, 98, 'Freizeit Club Bliesen e.V.'),
(7, 99, 'HMC Büttgen e.V.'),
(7, 100, 'KGC Bad Urach e.V.'),
(7, 101, 'MC \"Möve\" Cuxhaven-Sahlenburg e.V.'),
(7, 102, 'MC Flora Elmshorn e.V.'),
(7, 103, 'MC Schriesheim e.V.'),
(7, 104, 'MGC Brunsbüttel e.V.'),
(7, 105, 'MGC Oberkochen 1972 e.V.'),
(7, 106, 'MGC Olympia Kiel e.V.'),
(7, 107, 'MGC Unterschneidheim e.V.'),
(7, 108, 'MGF Magdeburg e.V.'),
(7, 109, 'Minigolf Wölfe Rheinstetten 02'),
(7, 110, 'MSC Bensheim-Auerbach e.V.'),
(7, 111, 'MSK Neheim-Hüsten e.V.'),
(7, 112, 'Reinickendorfer MGC e.V.'),
(7, 113, 'SSV Ulm 1846 e.V. Abt. Bahnengolf'),
(7, 114, 'Tempelhofer MV von 1965 e.V.'),
(7, 115, 'TG Höchberg von 1862 Bahnengolf e.V.'),
(7, 116, 'TSV Kücknitz von 1911 e.V.'),
(7, 117, 'TSV Salzgitter e.V.'),
(7, 118, 'VfM Berlin Spandau e.V.');

-- --------------------------------------------------------

--
-- Table structure for table `comptypes`
--

CREATE TABLE `comptypes` (
  `id` int(1) NOT NULL,
  `description` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comptypes`
--

INSERT INTO `comptypes` (`id`, `description`) VALUES
(1, 'Mannschaft'),
(2, 'Einzel'),
(3, 'Mannschaft + Einzel');

-- --------------------------------------------------------

--
-- Table structure for table `groupplayers`
--

CREATE TABLE `groupplayers` (
  `tid` int(3) NOT NULL,
  `groupid` int(11) NOT NULL,
  `playernumber` int(3) NOT NULL,
  `playerorder` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupplayers`
--

INSERT INTO `groupplayers` (`tid`, `groupid`, `playernumber`, `playerorder`) VALUES
(7, 44, 25578, 1),
(7, 44, 35663, 2),
(7, 45, 25020, 2),
(7, 45, 34693, 1),
(7, 46, 36474, 3),
(7, 46, 40671, 2),
(7, 46, 42074, 1),
(7, 47, 25686, 3),
(7, 47, 43515, 2),
(7, 47, 49067, 1),
(7, 48, 35795, 1),
(7, 48, 41663, 2),
(7, 49, 31089, 1),
(7, 49, 36211, 2),
(7, 50, 1359, 1),
(7, 50, 3776, 2),
(7, 50, 66447, 3),
(7, 51, 29046, 1),
(7, 51, 33996, 3),
(7, 51, 48508, 2),
(7, 52, 38362, 2),
(7, 52, 43508, 1),
(7, 52, 43922, 3),
(7, 53, 4859, 2),
(7, 53, 6693, 1),
(7, 53, 34878, 3),
(7, 54, 33928, 2),
(7, 54, 40668, 3),
(7, 54, 42783, 1),
(7, 55, 30869, 1),
(7, 55, 37027, 2),
(7, 55, 46986, 3),
(7, 56, 45139, 2),
(7, 56, 65927, 3),
(7, 56, 66992, 1),
(7, 57, 30185, 3),
(7, 57, 40720, 1),
(7, 57, 43192, 2),
(7, 58, 27206, 2),
(7, 58, 34408, 3),
(7, 58, 49742, 1),
(7, 59, 37444, 1),
(7, 59, 38177, 2),
(7, 59, 45059, 3),
(7, 60, 38208, 1),
(7, 60, 67707, 2),
(7, 61, 66802, 1),
(7, 61, 66809, 2),
(7, 62, 37856, 1),
(7, 62, 44416, 2),
(7, 62, 66990, 3),
(7, 63, 36323, 2),
(7, 63, 40888, 1),
(7, 63, 67248, 3),
(7, 64, 29677, 2),
(7, 64, 38230, 3),
(7, 64, 65955, 1),
(7, 65, 32627, 3),
(7, 65, 37141, 2),
(7, 65, 38155, 1),
(7, 66, 27202, 2),
(7, 66, 29850, 1),
(7, 66, 67611, 3),
(7, 67, 36538, 3),
(7, 67, 38040, 2),
(7, 67, 38113, 1),
(7, 68, 27214, 2),
(7, 68, 35449, 1),
(7, 68, 48559, 3),
(7, 69, 33349, 1),
(7, 69, 38135, 3),
(7, 69, 40622, 2),
(7, 70, 27550, 1),
(7, 70, 27909, 3),
(7, 70, 49074, 2),
(7, 71, 44760, 1),
(7, 71, 46910, 2),
(7, 71, 66223, 3),
(7, 72, 25840, 2),
(7, 72, 66336, 3),
(7, 72, 66569, 1),
(7, 73, 6524, 3),
(7, 73, 31952, 1),
(7, 73, 67480, 2),
(7, 74, 33891, 1),
(7, 74, 36258, 2),
(7, 74, 50172, 3),
(7, 75, 5581, 2),
(7, 75, 25785, 1),
(7, 75, 43272, 3),
(7, 76, 42690, 3),
(7, 76, 66787, 1),
(7, 76, 67557, 2),
(7, 77, 5966, 3),
(7, 77, 6616, 2),
(7, 77, 38316, 1),
(7, 78, 34839, 1),
(7, 78, 44409, 2),
(7, 78, 45054, 3),
(7, 79, 1951, 1),
(7, 79, 33393, 2),
(7, 79, 42965, 3),
(7, 80, 26349, 2),
(7, 80, 29114, 3),
(7, 80, 34780, 1),
(7, 81, 5015, 1),
(7, 81, 38336, 3),
(7, 81, 44862, 2),
(7, 82, 25512, 2),
(7, 82, 33442, 3),
(7, 82, 49559, 1),
(7, 83, 37752, 3),
(7, 83, 40792, 2),
(7, 83, 50596, 1),
(7, 84, 24092, 1),
(7, 84, 49066, 2),
(7, 85, 25578, 1),
(7, 85, 35663, 2),
(7, 86, 25020, 2),
(7, 86, 34693, 1),
(7, 87, 36474, 3),
(7, 87, 40671, 2),
(7, 87, 42074, 1),
(7, 88, 25686, 3),
(7, 88, 43515, 2),
(7, 88, 49067, 1),
(7, 89, 35795, 1),
(7, 89, 41663, 2),
(7, 90, 31089, 1),
(7, 90, 36211, 2),
(7, 91, 1359, 1),
(7, 91, 3776, 2),
(7, 91, 66447, 3),
(7, 92, 29046, 1),
(7, 92, 33996, 3),
(7, 92, 48508, 2),
(7, 93, 38362, 2),
(7, 93, 43508, 1),
(7, 93, 43922, 3),
(7, 94, 4859, 2),
(7, 94, 6693, 1),
(7, 94, 34878, 3),
(7, 95, 33928, 2),
(7, 95, 40668, 3),
(7, 95, 42783, 1),
(7, 96, 30869, 1),
(7, 96, 37027, 2),
(7, 96, 46986, 3),
(7, 97, 45139, 2),
(7, 97, 65927, 3),
(7, 97, 66992, 1),
(7, 98, 30185, 3),
(7, 98, 40720, 1),
(7, 98, 43192, 2),
(7, 99, 27206, 2),
(7, 99, 34408, 3),
(7, 99, 49742, 1),
(7, 100, 37444, 1),
(7, 100, 38177, 2),
(7, 100, 45059, 3),
(7, 101, 38208, 1),
(7, 101, 67707, 2),
(7, 102, 66802, 1),
(7, 102, 66809, 2),
(7, 103, 37856, 1),
(7, 103, 44416, 2),
(7, 103, 66990, 3),
(7, 104, 36323, 2),
(7, 104, 40888, 1),
(7, 104, 67248, 3),
(7, 105, 29677, 2),
(7, 105, 38230, 3),
(7, 105, 65955, 1),
(7, 106, 32627, 3),
(7, 106, 37141, 2),
(7, 106, 38155, 1),
(7, 107, 38040, 2),
(7, 107, 38135, 1),
(7, 108, 29850, 1),
(7, 108, 36538, 3),
(7, 108, 67611, 2),
(7, 109, 27202, 3),
(7, 109, 35449, 1),
(7, 109, 38113, 2),
(7, 110, 40622, 2),
(7, 110, 48559, 3),
(7, 110, 49074, 1),
(7, 111, 27214, 3),
(7, 111, 27550, 2),
(7, 111, 33349, 1),
(7, 112, 36258, 1),
(7, 112, 66569, 2),
(7, 113, 25840, 3),
(7, 113, 27909, 1),
(7, 113, 46910, 2),
(7, 114, 44760, 3),
(7, 114, 66223, 2),
(7, 114, 66336, 1),
(7, 115, 25785, 1),
(7, 115, 33891, 2),
(7, 115, 67480, 3),
(7, 116, 6524, 1),
(7, 116, 31952, 3),
(7, 116, 50172, 2),
(7, 117, 1951, 1),
(7, 117, 42690, 2),
(7, 118, 5581, 1),
(7, 118, 38316, 3),
(7, 118, 66787, 2),
(7, 119, 6616, 1),
(7, 119, 43272, 3),
(7, 119, 67557, 2),
(7, 120, 34839, 3),
(7, 120, 42965, 1),
(7, 120, 45054, 2),
(7, 121, 5966, 3),
(7, 121, 33393, 2),
(7, 121, 44409, 1),
(7, 122, 37752, 1),
(7, 122, 44862, 2),
(7, 123, 29114, 2),
(7, 123, 34780, 1),
(7, 123, 38336, 3),
(7, 124, 5015, 2),
(7, 124, 26349, 3),
(7, 124, 49559, 1),
(7, 125, 33442, 3),
(7, 125, 40792, 2),
(7, 125, 49066, 1),
(7, 126, 24092, 2),
(7, 126, 25512, 3),
(7, 126, 50596, 1),
(7, 127, 25578, 1),
(7, 127, 36538, 2),
(7, 128, 36474, 3),
(7, 128, 43515, 1),
(7, 128, 49067, 2),
(7, 129, 25840, 1),
(7, 129, 44760, 3),
(7, 129, 44862, 2),
(7, 130, 33393, 1),
(7, 130, 41663, 2),
(7, 131, 35795, 2),
(7, 131, 38135, 1),
(7, 132, 5581, 1),
(7, 132, 6693, 2),
(7, 133, 6616, 1),
(7, 133, 49559, 2),
(7, 133, 67557, 3),
(7, 134, 42965, 2),
(7, 134, 66336, 1),
(7, 135, 5015, 3),
(7, 135, 27202, 2),
(7, 135, 45054, 1),
(7, 136, 29046, 2),
(7, 136, 40622, 1),
(7, 136, 48508, 3),
(7, 137, 5966, 2),
(7, 137, 24092, 3),
(7, 137, 34878, 1),
(7, 138, 6524, 1),
(7, 138, 25512, 3),
(7, 138, 50172, 2),
(7, 139, 27550, 1),
(7, 139, 42783, 2),
(7, 140, 34839, 3),
(7, 140, 38336, 1),
(7, 140, 48559, 2),
(7, 141, 29850, 3),
(7, 141, 30869, 2),
(7, 141, 44409, 1),
(7, 142, 49066, 3),
(7, 142, 49074, 2),
(7, 142, 50596, 1),
(7, 143, 33349, 2),
(7, 143, 33442, 1),
(7, 143, 43272, 3),
(7, 144, 29114, 2),
(7, 144, 31952, 1),
(7, 144, 34780, 3),
(7, 145, 45059, 1),
(7, 145, 49742, 2),
(7, 146, 27206, 1),
(7, 146, 38177, 2),
(7, 147, 40888, 2),
(7, 147, 66802, 1),
(7, 148, 38208, 2),
(7, 148, 67248, 1),
(7, 149, 29677, 2),
(7, 149, 32627, 1),
(7, 149, 44416, 3),
(7, 150, 37856, 2),
(7, 150, 38155, 1),
(7, 150, 66990, 3);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `tid` int(3) NOT NULL,
  `trackid` int(3) NOT NULL,
  `groupid` int(11) NOT NULL,
  `grouporder` int(3) DEFAULT NULL,
  `currentgroup` int(1) DEFAULT 0,
  `mid` int(11) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`tid`, `trackid`, `groupid`, `grouporder`, `currentgroup`, `mid`, `rid`) VALUES
(7, 28, 44, 1, 0, 27, 15),
(7, 28, 45, 2, 0, 27, 15),
(7, 28, 46, 3, 0, 27, 15),
(7, 28, 47, 4, 0, 27, 15),
(7, 28, 48, 5, 0, 27, 15),
(7, 28, 49, 6, 0, 27, 15),
(7, 28, 50, 7, 0, 27, 15),
(7, 28, 51, 8, 0, 27, 15),
(7, 28, 52, 9, 0, 27, 15),
(7, 28, 53, 10, 0, 27, 15),
(7, 28, 54, 11, 0, 27, 15),
(7, 28, 55, 12, 0, 27, 15),
(7, 28, 56, 13, 0, 27, 15),
(7, 28, 57, 14, 0, 27, 15),
(7, 28, 58, 15, 1, 27, 15),
(7, 28, 59, 16, 0, 27, 15),
(7, 28, 60, 17, 0, 27, 15),
(7, 28, 61, 18, 0, 27, 15),
(7, 28, 62, 19, 0, 27, 15),
(7, 28, 63, 20, 0, 27, 15),
(7, 28, 64, 21, 0, 27, 15),
(7, 28, 65, 22, 0, 27, 15),
(7, 28, 66, 23, 0, 27, 15),
(7, 28, 67, 24, 0, 27, 15),
(7, 28, 68, 25, 0, 27, 15),
(7, 28, 69, 26, 0, 27, 15),
(7, 28, 70, 27, 0, 27, 15),
(7, 28, 71, 28, 0, 27, 15),
(7, 28, 72, 29, 0, 27, 15),
(7, 28, 73, 30, 0, 27, 15),
(7, 28, 74, 31, 0, 27, 15),
(7, 28, 75, 32, 0, 27, 15),
(7, 28, 76, 33, 0, 27, 15),
(7, 28, 77, 34, 0, 27, 15),
(7, 28, 78, 35, 0, 27, 15),
(7, 28, 79, 36, 0, 27, 15),
(7, 28, 80, 37, 0, 27, 15),
(7, 28, 81, 38, 0, 27, 15),
(7, 28, 82, 39, 0, 27, 15),
(7, 28, 83, 40, 0, 27, 15),
(7, 28, 84, 41, 0, 27, 15),
(7, 28, 85, 1, 0, 29, 17),
(7, 28, 86, 2, 0, 29, 17),
(7, 28, 87, 3, 0, 29, 17),
(7, 28, 88, 4, 0, 29, 17),
(7, 28, 89, 5, 0, 29, 17),
(7, 28, 90, 6, 0, 29, 17),
(7, 28, 91, 7, 0, 29, 17),
(7, 28, 92, 8, 0, 29, 17),
(7, 28, 93, 9, 0, 29, 17),
(7, 28, 94, 10, 0, 29, 17),
(7, 28, 95, 11, 0, 29, 17),
(7, 28, 96, 12, 0, 29, 17),
(7, 28, 97, 13, 0, 29, 17),
(7, 28, 98, 14, 0, 29, 17),
(7, 28, 99, 15, 1, 29, 17),
(7, 28, 100, 16, 0, 29, 17),
(7, 28, 101, 17, 0, 29, 17),
(7, 28, 102, 18, 0, 29, 17),
(7, 28, 103, 19, 0, 29, 17),
(7, 28, 104, 20, 0, 29, 17),
(7, 28, 105, 21, 0, 29, 17),
(7, 28, 106, 22, 0, 29, 17),
(7, 28, 107, 23, 0, 29, 17),
(7, 28, 108, 24, 0, 29, 17),
(7, 28, 109, 25, 0, 29, 17),
(7, 28, 110, 26, 0, 29, 17),
(7, 28, 111, 27, 0, 29, 17),
(7, 28, 112, 28, 0, 29, 17),
(7, 28, 113, 29, 0, 29, 17),
(7, 28, 114, 30, 0, 29, 17),
(7, 28, 115, 31, 0, 29, 17),
(7, 28, 116, 32, 0, 29, 17),
(7, 28, 117, 33, 0, 29, 17),
(7, 28, 118, 34, 0, 29, 17),
(7, 28, 119, 35, 0, 29, 17),
(7, 28, 120, 36, 0, 29, 17),
(7, 28, 121, 37, 0, 29, 17),
(7, 28, 122, 38, 0, 29, 17),
(7, 28, 123, 39, 0, 29, 17),
(7, 28, 124, 40, 0, 29, 17),
(7, 28, 125, 41, 0, 29, 17),
(7, 28, 126, 42, 0, 29, 17),
(7, 28, 127, 1, 0, 31, 18),
(7, 28, 128, 2, 0, 31, 18),
(7, 28, 129, 3, 0, 31, 18),
(7, 28, 130, 4, 0, 31, 18),
(7, 28, 131, 5, 0, 31, 18),
(7, 28, 132, 6, 0, 31, 18),
(7, 28, 133, 7, 0, 31, 18),
(7, 28, 134, 8, 0, 31, 18),
(7, 28, 135, 9, 0, 31, 18),
(7, 28, 136, 10, 0, 31, 18),
(7, 28, 137, 11, 0, 31, 18),
(7, 28, 138, 12, 0, 31, 18),
(7, 28, 139, 13, 0, 31, 18),
(7, 28, 140, 14, 0, 31, 18),
(7, 28, 141, 15, 1, 31, 18),
(7, 28, 142, 16, 0, 31, 18),
(7, 28, 143, 17, 0, 31, 18),
(7, 28, 144, 18, 0, 31, 18),
(7, 28, 145, 19, 0, 31, 18),
(7, 28, 146, 20, 0, 31, 18),
(7, 28, 147, 21, 0, 31, 18),
(7, 28, 148, 22, 0, 31, 18),
(7, 28, 149, 23, 0, 31, 18),
(7, 28, 150, 24, 0, 31, 18);

-- --------------------------------------------------------

--
-- Table structure for table `matchdays`
--

CREATE TABLE `matchdays` (
  `tid` int(3) NOT NULL,
  `mdnumber` int(3) NOT NULL,
  `mddescription` char(40) NOT NULL DEFAULT '',
  `mdcurrent` int(1) DEFAULT 0,
  `mid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matchdays`
--

INSERT INTO `matchdays` (`tid`, `mdnumber`, `mddescription`, `mdcurrent`, `mid`) VALUES
(7, 1, '', 0, 27),
(7, 2, '', 0, 29),
(7, 3, '', 1, 31);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `tid` int(5) NOT NULL,
  `cid` int(3) NOT NULL,
  `playernumber` int(3) NOT NULL,
  `gender` char(1) NOT NULL,
  `surname` char(20) NOT NULL,
  `firstname` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`tid`, `cid`, `playernumber`, `gender`, `surname`, `firstname`) VALUES
(7, 89, 1359, 'M', 'Engelmann', 'Uwe'),
(7, 108, 1951, 'M', 'Burkert', 'Michael'),
(7, 85, 3776, 'M', 'Ballbach', 'Helmut'),
(7, 109, 4859, 'M', 'Wiegelmann', 'Reinhold'),
(7, 103, 5015, 'M', 'Canceniella', 'Raffaele'),
(7, 90, 5581, 'M', 'Wetzel', 'Paul'),
(7, 115, 5966, 'M', 'Limpius', 'Werner'),
(7, 106, 6524, 'M', 'Otto', 'Kuno'),
(7, 91, 6616, 'M', 'Romberg', 'Wolfgang'),
(7, 98, 6693, 'M', 'Manderscheid', 'Hans'),
(7, 110, 24092, 'M', 'Klee', 'Hannes'),
(7, 106, 25020, 'M', 'Otto', 'Karin'),
(7, 115, 25512, 'M', 'Fischer', 'Gerd'),
(7, 85, 25578, 'M', 'Boltze', 'Kornelia'),
(7, 91, 25686, 'M', 'Romberg', 'Silvia'),
(7, 99, 25785, 'M', 'Mandel', 'Norman'),
(7, 92, 25840, 'M', 'Morgenstern', 'Angela'),
(7, 87, 26349, 'M', 'Osnabrügge', 'Jörn'),
(7, 87, 27202, 'M', 'Beutin', 'Jürgen'),
(7, 105, 27206, 'M', 'Raith', 'Bianca'),
(7, 115, 27214, 'M', 'Mitterle', 'Norbert'),
(7, 110, 27550, 'M', 'Fritsch', 'Hans-Peter'),
(7, 90, 27909, 'M', 'Habrich', 'Klaus'),
(7, 116, 29046, 'M', 'Brandis', 'Peter'),
(7, 117, 29114, 'M', 'Otten', 'Dirk'),
(7, 106, 29677, 'M', 'Lagerquist', 'René'),
(7, 101, 29796, 'M', 'Willenbockel', 'Marion'),
(7, 90, 29850, 'M', 'Just', 'Michael'),
(7, 87, 30185, 'M', 'Magin', 'Thomas'),
(7, 110, 30869, 'M', 'Träger', 'Andreas'),
(7, 99, 31089, 'M', 'Richter', 'Anja'),
(7, 115, 31952, 'M', 'Herzberger', 'Sven'),
(7, 108, 32627, 'M', 'Leickel', 'Kevin'),
(7, 106, 33349, 'M', 'Santen', 'Ralph'),
(7, 110, 33393, 'M', 'Parr', 'Susanne'),
(7, 112, 33442, 'M', 'Becker', 'Martin'),
(7, 103, 33891, 'M', 'Schmitt', 'Uwe'),
(7, 104, 33928, 'M', 'Schmidt', 'Thorben'),
(7, 99, 33996, 'M', 'Ehlert', 'Ulrich'),
(7, 85, 34408, 'M', 'Nikolaus', 'Sandra'),
(7, 99, 34693, 'M', 'Crass', 'Annegret'),
(7, 90, 34780, 'M', 'Lang', 'Jürgen'),
(7, 112, 34839, 'M', 'Georgi', 'Holger'),
(7, 110, 34878, 'M', 'Jung', 'Horst'),
(7, 91, 35449, 'M', 'Eisleben', 'Dirk'),
(7, 86, 35663, 'M', 'Blasek', 'Nicole'),
(7, 109, 35795, 'M', 'Grüßinger', 'Beatriz'),
(7, 85, 36211, 'M', 'Moosmann', 'Stefanie'),
(7, 108, 36258, 'M', 'Pape', 'Ronald'),
(7, 100, 36323, 'M', 'Bönsch', 'Patrick'),
(7, 99, 36474, 'M', 'Klein', 'Sabine'),
(7, 92, 36538, 'M', 'Piechotta', 'Rosemarie'),
(7, 113, 37027, 'M', 'Neuburger', 'Andreas'),
(7, 118, 37141, 'M', 'Hardt', 'Andreas'),
(7, 85, 37444, 'M', 'Moosmann', 'Katharina'),
(7, 108, 37752, 'M', 'Hoppe', 'Mike'),
(7, 107, 37856, 'M', 'Deeg', 'Martin'),
(7, 101, 38040, 'M', 'Köhler', 'Frank'),
(7, 103, 38113, 'M', 'Weiß', 'Michael'),
(7, 108, 38135, 'M', 'Burkert', 'Sabine Monika'),
(7, 93, 38155, 'M', 'Knoblauch', 'Jan'),
(7, 108, 38177, 'M', 'Fischbeck', 'Patricia'),
(7, 93, 38208, 'M', 'Montberg', 'Tobias'),
(7, 87, 38230, 'M', 'Moosmann', 'Jan-Niclas'),
(7, 92, 38316, 'M', 'Brocks', 'Ralf'),
(7, 92, 38336, 'M', 'Brocks', 'Carsten'),
(7, 88, 38362, 'M', 'Stuppy', 'Ingo'),
(7, 106, 40135, 'M', 'Graage', 'Christian'),
(7, 103, 40622, 'M', 'Müller', 'Peter'),
(7, 85, 40668, 'M', 'Moosmann', 'Mathias'),
(7, 85, 40671, 'M', 'Ballbach', 'Blandine'),
(7, 99, 40720, 'M', 'Lumma', 'Dirk'),
(7, 103, 40792, 'M', 'Killmaier', 'Thilo'),
(7, 102, 40888, 'M', 'Bychowski', 'Torben'),
(7, 100, 41663, 'M', 'Bönsch', 'Heidi'),
(7, 115, 42074, 'M', 'Limpius', 'Andrea'),
(7, 101, 42690, 'M', 'Reinicke', 'Michael'),
(7, 97, 42783, 'M', 'Neumann', 'Josef'),
(7, 99, 42965, 'M', 'Ring', 'Norbert'),
(7, 105, 43192, 'M', 'Raith', 'Richard'),
(7, 87, 43272, 'M', 'Ackermann', 'Hendrik'),
(7, 102, 43508, 'M', 'Jürs', 'Dieter'),
(7, 102, 43515, 'M', 'Jürs', 'Gabriele'),
(7, 96, 43922, 'M', 'Sinzenich', 'Michael'),
(7, 106, 44409, 'M', 'Christ', 'Daniel'),
(7, 87, 44416, 'M', 'Hahn', 'Robert'),
(7, 87, 44760, 'M', 'Crößmann', 'Ursula'),
(7, 101, 44862, 'M', 'Reinicke', 'Andrea'),
(7, 103, 45054, 'M', 'Appel', 'Willi'),
(7, 118, 45059, 'M', 'Hardt', 'Claudia'),
(7, 95, 45139, 'M', 'Dippelhofer', 'René'),
(7, 117, 46910, 'M', 'Bätge', 'Richard'),
(7, 91, 46986, 'M', 'Adenau', 'Jürgen'),
(7, 114, 48508, 'M', 'Kiefer', 'Andreas'),
(7, 112, 48559, 'M', 'Tetzlaff', 'Jörg'),
(7, 99, 49066, 'M', 'Spies', 'Thomas'),
(7, 99, 49067, 'M', 'Hoefig', 'Hildegard'),
(7, 99, 49074, 'M', 'Hoefig', 'Michael'),
(7, 87, 49312, 'M', 'Rein', 'Andy'),
(7, 91, 49559, 'M', 'Kohnke', 'Michael'),
(7, 106, 49742, 'M', 'Lagerquist', 'Britta'),
(7, 110, 50172, 'M', 'Hilß', 'Reinhold'),
(7, 106, 50596, 'M', 'Theden', 'Jan-Christoph'),
(7, 86, 50889, 'M', 'Schönherr', 'Ute'),
(7, 99, 65927, 'M', 'Ernst', 'Klaus'),
(7, 94, 65955, 'M', 'Klotz', 'Sascha'),
(7, 103, 66223, 'M', 'Pawelka', 'Stephan'),
(7, 91, 66336, 'M', 'Cöln', 'Herbert'),
(7, 98, 66447, 'M', 'Arweiler', 'Stefan'),
(7, 101, 66569, 'M', 'Beier', 'Christian'),
(7, 117, 66787, 'M', 'Schäning', 'Sven'),
(7, 103, 66802, 'M', 'Weber', 'Marco'),
(7, 111, 66809, 'M', 'Oldhafer', 'Torben'),
(7, 95, 66990, 'M', 'Hagemeyer', 'David'),
(7, 85, 66992, 'M', 'Roth', 'Frank'),
(7, 95, 67248, 'M', 'Hudert', 'Luca'),
(7, 112, 67480, 'M', 'Becker', 'Jochen'),
(7, 103, 67557, 'M', 'Kuhn', 'Rolf'),
(7, 117, 67611, 'M', 'Kissinger', 'Frank'),
(7, 85, 67707, 'M', 'Moosmann', 'Daniel');

-- --------------------------------------------------------

--
-- Table structure for table `rounds`
--

CREATE TABLE `rounds` (
  `tid` int(3) NOT NULL,
  `rnumber` int(3) NOT NULL,
  `rdescription` char(40) NOT NULL DEFAULT '',
  `rcurrent` int(1) NOT NULL DEFAULT 0,
  `rid` int(11) NOT NULL,
  `mid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rounds`
--

INSERT INTO `rounds` (`tid`, `rnumber`, `rdescription`, `rcurrent`, `rid`, `mid`) VALUES
(7, 1, '', 0, 15, 27),
(7, 1, '', 0, 17, 29),
(7, 1, '', 1, 18, 31);

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `tid` int(3) NOT NULL,
  `tname` char(20) NOT NULL,
  `tlocation` char(20) NOT NULL,
  `tactive` tinyint(1) NOT NULL,
  `tcurrent` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournaments`
--

INSERT INTO `tournaments` (`tid`, `tname`, `tlocation`, `tactive`, `tcurrent`) VALUES
(7, 'DM 2023', 'Schriesheim', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `tid` int(3) NOT NULL,
  `trackid` int(3) NOT NULL,
  `currentgroup` int(2) DEFAULT NULL,
  `label` char(1) NOT NULL,
  `trackdescription` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`tid`, `trackid`, `currentgroup`, `label`, `trackdescription`) VALUES
(7, 28, NULL, 'M', 'Minigolf');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` char(20) NOT NULL,
  `userpassword` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `userpassword`) VALUES
('asd', '$2y$10$jWrDiQtGqUoae8YGOO39fOoYdg5g5y3pGvlwjAsSpLSxFnjsywuQ6'),
('ralizadeh', '$2y$10$IthUcaqvb2jGe0Pu2K1NfekyPKAcRwB.yrzWpFk0DJiO6Yr6s4IJm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`cid`,`tid`) USING BTREE,
  ADD KEY `tournament id` (`tid`);

--
-- Indexes for table `comptypes`
--
ALTER TABLE `comptypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupplayers`
--
ALTER TABLE `groupplayers`
  ADD PRIMARY KEY (`tid`,`groupid`,`playernumber`),
  ADD KEY `tid` (`tid`,`playernumber`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`tid`,`groupid`),
  ADD UNIQUE KEY `groupid` (`groupid`);

--
-- Indexes for table `matchdays`
--
ALTER TABLE `matchdays`
  ADD PRIMARY KEY (`mid`,`tid`,`mdnumber`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`tid`,`playernumber`);

--
-- Indexes for table `rounds`
--
ALTER TABLE `rounds`
  ADD PRIMARY KEY (`rid`,`tid`,`mid`,`rcurrent`);

--
-- Indexes for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`tid`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`tid`,`trackid`),
  ADD UNIQUE KEY `trackid` (`trackid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `cid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `groupid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `matchdays`
--
ALTER TABLE `matchdays`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `rounds`
--
ALTER TABLE `rounds`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `tid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `trackid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clubs`
--
ALTER TABLE `clubs`
  ADD CONSTRAINT `tournament id` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`);

--
-- Constraints for table `groupplayers`
--
ALTER TABLE `groupplayers`
  ADD CONSTRAINT `groupplayers_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`),
  ADD CONSTRAINT `groupplayers_ibfk_2` FOREIGN KEY (`tid`,`playernumber`) REFERENCES `players` (`tid`, `playernumber`);

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

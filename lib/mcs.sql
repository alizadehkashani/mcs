-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2022 at 10:02 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

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
(2, 1, 'MCS Schriesheim'),
(2, 2, 'Heidelberg'),
(2, 5, 'Hirschberg'),
(2, 8, 'Mannheim'),
(2, 9, 'Mannheim'),
(2, 10, 'Mannheim'),
(2, 11, 'Mannheim'),
(2, 12, 'Mannheim'),
(2, 13, 'Mannheim'),
(2, 14, 'Mannheim'),
(2, 15, 'Mannheim'),
(2, 16, 'Mannheim'),
(2, 17, 'Mannheim'),
(2, 18, 'Mannheim'),
(2, 19, 'Mannheim'),
(2, 20, 'Mannheim'),
(2, 21, 'Mannheim'),
(2, 22, 'Mannheim'),
(2, 23, 'Mannheim'),
(2, 24, 'Mannheim'),
(2, 25, 'Mannheim'),
(2, 26, 'Mannheim'),
(2, 27, 'Mannheim'),
(2, 28, 'Mannheim'),
(2, 29, 'Mannheim'),
(2, 30, 'Mannheim'),
(2, 31, 'Mannheim Lindenhof'),
(2, 32, 'Mannheim'),
(2, 33, 'Mannheim'),
(2, 34, 'Mannheim'),
(2, 35, 'Mannheim'),
(2, 36, 'Mannheim'),
(2, 37, 'Mannheim'),
(2, 38, 'Mannheim'),
(2, 40, 'Viernheim'),
(2, 44, 'Hannover 96'),
(2, 46, 'Lindenhof'),
(1, 47, 'MCS Schriesheim'),
(3, 76, 'Weinheim'),
(3, 77, 'test'),
(1, 78, 'Heidelberg'),
(1, 79, 'Mannheim'),
(1, 80, 'Hirschberg'),
(1, 81, 'Leutershausen');

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
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `startorder` int(3) NOT NULL,
  `type` char(1) NOT NULL,
  `gender` char(1) NOT NULL,
  `track` char(1) NOT NULL,
  `startgroup` int(2) NOT NULL,
  `playerorder` int(1) NOT NULL,
  `player` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`startorder`, `type`, `gender`, `track`, `startgroup`, `playerorder`, `player`) VALUES
(1, '', '', 'A', 1, 0, 101),
(1, '', '', 'A', 1, 0, 106),
(1, '', '', 'A', 1, 0, 111),
(1, '', '', 'B', 1, 0, 101),
(1, '', '', 'B', 1, 0, 106),
(1, '', '', 'B', 1, 0, 111),
(2, '', '', 'A', 2, 0, 102),
(2, '', '', 'A', 2, 0, 107),
(2, '', '', 'A', 2, 0, 112),
(2, '', '', 'B', 2, 0, 102),
(2, '', '', 'B', 2, 0, 107),
(2, '', '', 'B', 2, 0, 112),
(3, '', '', 'A', 3, 0, 103),
(3, '', '', 'A', 3, 0, 108),
(3, '', '', 'A', 3, 0, 113),
(3, '', '', 'B', 3, 0, 103),
(3, '', '', 'B', 3, 0, 108),
(3, '', '', 'B', 3, 0, 113),
(4, '', '', 'A', 4, 0, 104),
(4, '', '', 'A', 4, 0, 109),
(4, '', '', 'B', 4, 0, 104),
(4, '', '', 'B', 4, 0, 109),
(5, '', '', 'A', 1, 0, 105),
(5, '', '', 'A', 1, 0, 110),
(5, '', '', 'B', 1, 0, 105),
(5, '', '', 'B', 1, 0, 110);

-- --------------------------------------------------------

--
-- Table structure for table `indvgroups`
--

CREATE TABLE `indvgroups` (
  `startorder` int(2) NOT NULL,
  `comptype` char(1) NOT NULL,
  `gender` char(1) NOT NULL,
  `playerorder` int(1) NOT NULL,
  `player` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `indvgroups`
--

INSERT INTO `indvgroups` (`startorder`, `comptype`, `gender`, `playerorder`, `player`) VALUES
(1, '1', 'D', 0, 101),
(1, '1', 'D', 1, 103),
(1, '1', 'D', 2, 112),
(1, '1', 'H', 0, 222),
(1, '1', 'H', 2, 234),
(1, '1', 'H', 1, 237),
(2, '1', 'D', 0, 108),
(2, '1', 'D', 1, 113),
(2, '1', 'D', 2, 119),
(2, '1', 'H', 1, 207),
(2, '1', 'H', 2, 216),
(2, '1', 'H', 0, 250),
(3, '1', 'D', 0, 104),
(3, '1', 'D', 2, 109),
(3, '1', 'D', 1, 115),
(3, '1', 'H', 0, 223),
(3, '1', 'H', 1, 238),
(3, '1', 'H', 2, 240),
(4, '1', 'D', 2, 105),
(4, '1', 'D', 0, 114),
(4, '1', 'D', 1, 120),
(4, '1', 'H', 1, 209),
(4, '1', 'H', 2, 217),
(4, '1', 'H', 0, 251),
(5, '1', 'D', 1, 110),
(5, '1', 'D', 0, 116),
(5, '1', 'D', 2, 235),
(5, '1', 'H', 0, 225),
(5, '1', 'H', 1, 239),
(5, '1', 'H', 2, 243),
(6, '1', 'D', 2, 111),
(6, '1', 'D', 1, 117),
(6, '1', 'D', 0, 304),
(6, '1', 'H', 1, 210),
(6, '1', 'H', 2, 218),
(6, '1', 'H', 0, 252),
(7, '1', 'D', 0, 307),
(7, '1', 'D', 1, 308),
(7, '1', 'H', 0, 226),
(7, '1', 'H', 1, 241),
(7, '1', 'H', 2, 245),
(8, '1', 'H', 1, 213),
(8, '1', 'H', 2, 219),
(8, '1', 'H', 0, 253),
(9, '1', 'H', 0, 227),
(9, '1', 'H', 1, 242),
(9, '1', 'H', 2, 246),
(10, '1', 'H', 0, 214),
(10, '1', 'H', 1, 220),
(10, '1', 'H', 2, 228),
(11, '1', 'H', 0, 244),
(11, '1', 'H', 1, 247),
(11, '1', 'H', 2, 301),
(12, '1', 'H', 0, 221),
(12, '1', 'H', 1, 229),
(12, '1', 'H', 2, 306),
(13, '1', 'H', 1, 302),
(13, '1', 'H', 2, 305),
(13, '1', 'H', 0, 309),
(14, '1', 'H', 1, 303),
(14, '1', 'H', 0, 310),
(14, '1', 'H', 2, 311);

-- --------------------------------------------------------

--
-- Table structure for table `matchdays`
--

CREATE TABLE `matchdays` (
  `tid` int(3) NOT NULL,
  `mdnumber` int(3) NOT NULL,
  `mddescription` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matchdays`
--

INSERT INTO `matchdays` (`tid`, `mdnumber`, `mddescription`) VALUES
(1, 1, 'test'),
(1, 2, 'test'),
(1, 3, ''),
(1, 5, 'test'),
(1, 6, ''),
(2, 1, ''),
(2, 2, ''),
(2, 3, ''),
(2, 4, ''),
(2, 5, ''),
(3, 1, ''),
(3, 2, ''),
(3, 3, ''),
(3, 4, ''),
(3, 5, ''),
(4, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `playernumber` int(3) NOT NULL,
  `gender` char(1) NOT NULL,
  `surname` char(20) NOT NULL,
  `firstname` char(20) NOT NULL,
  `club` int(2) NOT NULL,
  `comptype` int(11) NOT NULL,
  `playerorderteam` int(2) NOT NULL,
  `startgroupsingle` int(3) NOT NULL,
  `playerordersingle` int(11) NOT NULL,
  `resultsingle` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`playernumber`, `gender`, `surname`, `firstname`, `club`, `comptype`, `playerorderteam`, `startgroupsingle`, `playerordersingle`, `resultsingle`) VALUES
(101, 'D', 'Ebi', 'Sabine', 7, 3, 1, 0, 0, 1),
(102, 'D', 'Saft', 'Chiana', 12, 2, 0, 1, 1, 2),
(103, 'D', 'Blendermann', 'Stefanie', 8, 3, 1, 0, 0, 3),
(104, 'D', 'Kobisch', 'Alice', 8, 3, 2, 0, 0, 4),
(105, 'D', 'Gundert', 'Nicole', 8, 3, 3, 0, 0, 5),
(106, 'D', 'Kirgasser', 'Helga', 13, 2, 0, 1, 2, 6),
(107, 'D', 'Klaus', 'Liana', 14, 2, 0, 2, 1, 7),
(108, 'D', 'Bothmann', 'Jasmin', 10, 3, 1, 0, 0, 8),
(109, 'D', 'Birkelbach', 'Nicole', 10, 3, 2, 0, 0, 9),
(110, 'D', 'Zodrow-Wenke', 'Bianca', 10, 3, 3, 0, 0, 10),
(111, 'D', 'von dem Knesebeck', 'Alexandra', 10, 3, 4, 0, 0, 11),
(112, 'D', 'Schumacher', 'Sarah', 9, 3, 1, 0, 0, 12),
(113, 'D', 'Krane', 'Michaela', 11, 3, 1, 0, 0, 13),
(114, 'D', 'Krane', 'Melissa', 11, 3, 2, 0, 0, 14),
(115, 'D', 'Bollrich', 'Anne', 9, 3, 2, 0, 0, 15),
(116, 'D', 'Peuker', 'Vanessa', 9, 3, 3, 0, 0, 16),
(117, 'D', 'Bremicker', 'Susanne', 9, 3, 4, 0, 0, 17),
(118, 'D', 'Klein', 'Sabine', 15, 2, 0, 2, 2, 18),
(119, 'D', 'Hammerschmidt', 'Melanie', 7, 3, 2, 0, 0, 19),
(120, 'D', 'Raith', 'Bianca', 7, 3, 3, 0, 0, 20),
(201, 'H', 'Fallenbüchel', 'Martin', 16, 2, 0, 1, 1, 1),
(202, 'H', 'Ritschel', 'Michael', 16, 2, 0, 1, 2, 2),
(203, 'H', 'Richter', 'Tobias', 17, 2, 0, 1, 3, 3),
(204, 'H', 'Bäurle', 'Wolfgang', 18, 2, 0, 2, 1, 4),
(205, 'H', 'Schmidt', 'Maximilian', 18, 2, 0, 2, 2, 5),
(206, 'H', 'Bollrich', 'Jens', 19, 2, 0, 2, 3, 6),
(207, 'H', 'Blümer', 'Severin', 5, 3, 1, 0, 0, 7),
(208, 'H', 'Van Diejen', 'Tom', 20, 2, 0, 3, 1, 8),
(209, 'H', 'Klassen', 'Oleg', 5, 3, 2, 0, 0, 9),
(210, 'H', 'Van Vught', 'Jan', 5, 3, 3, 0, 0, 10),
(211, 'H', 'Pester', 'Magnus', 21, 2, 0, 3, 2, 11),
(212, 'H', 'Drewes', 'Daniel', 21, 2, 0, 3, 3, 12),
(213, 'H', 'Braungart Zink', 'Achim', 5, 3, 4, 0, 0, 13),
(214, 'H', 'Hense', 'Danny', 5, 3, 5, 0, 0, 14),
(215, 'H', 'Giebenhain', 'Thomas', 20, 2, 0, 4, 1, 15),
(216, 'H', 'Stöckle', 'Martin', 6, 3, 1, 0, 0, 16),
(217, 'H', 'Wietz', 'Florian', 6, 3, 2, 0, 0, 17),
(218, 'H', 'Stille', 'Kris', 6, 3, 3, 0, 0, 18),
(219, 'H', 'Mrohs', 'Alexander', 6, 3, 4, 0, 0, 19),
(220, 'H', 'Güth', 'Benjamin', 6, 3, 5, 0, 0, 20),
(221, 'H', 'Wendling', 'Oliver', 6, 3, 6, 0, 0, 21),
(222, 'H', 'Dickes', 'Robin', 1, 3, 1, 0, 0, 22),
(223, 'H', 'Krauss', 'Silvio', 1, 3, 2, 0, 0, 23),
(224, 'H', 'Moosmann', 'Jan-Niclas', 22, 2, 0, 4, 2, 24),
(225, 'H', 'Noack', 'Marcel', 1, 3, 3, 0, 0, 25),
(226, 'H', 'Neumann', 'Lukas', 1, 3, 4, 0, 0, 26),
(227, 'H', 'Stoparic', 'Miroslav', 1, 3, 5, 0, 0, 27),
(228, 'H', 'Kobisch', 'Roman', 1, 3, 6, 0, 0, 28),
(229, 'H', 'Janßen', 'Markus', 1, 3, 7, 0, 0, 29),
(230, 'H', 'Grunt', 'Christoph', 23, 2, 0, 4, 3, 30),
(231, 'H', 'Ulrich', 'Stefan', 23, 2, 0, 5, 1, 31),
(232, 'H', 'Schmidt', 'Frank', 13, 2, 0, 5, 2, 32),
(233, 'H', 'Zielaff', 'Christian', 10, 2, 0, 5, 3, 33),
(234, 'H', 'Müller', 'Yannick', 3, 3, 1, 0, 0, 34),
(235, 'H', 'Klöckener', 'Lauro', 11, 3, 3, 0, 0, 35),
(236, 'H', 'Schmeckenbecher', 'Kenny Marc', 24, 2, 0, 6, 1, 36),
(237, 'H', 'Kapke', 'Dennis', 2, 3, 1, 0, 0, 37),
(238, 'H', 'Heine', 'Sebastian', 2, 3, 2, 0, 0, 38),
(239, 'H', 'Hettrich', 'Robin', 2, 3, 3, 0, 0, 39),
(240, 'H', 'Piekorz', 'Sebastian', 3, 3, 2, 0, 0, 40),
(241, 'H', 'Bothmann', 'Patrick', 2, 3, 4, 0, 0, 41),
(242, 'H', 'Kube', 'Sebastian', 2, 3, 5, 0, 0, 42),
(243, 'H', 'Geist', 'Alexander', 3, 3, 3, 0, 0, 43),
(244, 'H', 'Junkermann', 'Alexander', 2, 3, 6, 0, 0, 44),
(245, 'H', 'Koziol', 'Michael', 3, 3, 4, 0, 0, 45),
(246, 'H', 'Erlbruch', 'Walter', 3, 3, 5, 0, 0, 46),
(247, 'H', 'Erlbruch', 'Harald', 3, 3, 6, 0, 0, 47),
(248, 'H', 'Lumma', 'Dirk', 15, 2, 0, 6, 2, 48),
(249, 'H', 'Springob', 'René', 11, 2, 0, 6, 3, 49),
(250, 'H', 'Lichtenberg', 'Jan Peter', 4, 3, 1, 0, 0, 50),
(251, 'H', 'Lieber', 'Johannes', 4, 3, 2, 0, 0, 51),
(252, 'H', 'Spreier', 'Sascha', 4, 3, 3, 0, 0, 52),
(253, 'H', 'Gillen', 'Pascal', 4, 3, 4, 0, 0, 53),
(301, 'H', 'Rhyn', 'Michel', 5, 1, 6, 0, 0, 0),
(302, 'H', 'Heipel', 'Ingmar', 5, 1, 7, 0, 0, 0),
(303, 'H', 'Lorenz', 'Patrick', 5, 1, 8, 0, 0, 0),
(304, 'D', 'Klukas', 'Yvonne', 8, 1, 4, 0, 0, 0),
(305, 'H', 'Sommer', 'Reto', 1, 1, 8, 0, 0, 0),
(306, 'H', 'Dorner', 'Kai', 2, 1, 7, 0, 0, 0),
(307, 'D', 'Tietz', 'Marlene', 11, 1, 5, 0, 0, 0),
(308, 'D', 'Borggraefe', 'Martina', 11, 1, 6, 0, 0, 0),
(309, 'H', 'Jecny', 'Martin', 3, 1, 7, 0, 0, 0),
(310, 'H', 'Smejkal', 'Marek', 3, 1, 8, 0, 0, 0),
(311, 'H', 'Molnár', 'Karel Jr.', 3, 1, 9, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `rounds`
--

CREATE TABLE `rounds` (
  `tid` int(3) NOT NULL,
  `mdnumber` int(3) NOT NULL,
  `rnumber` int(3) NOT NULL,
  `rdescription` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rounds`
--

INSERT INTO `rounds` (`tid`, `mdnumber`, `rnumber`, `rdescription`) VALUES
(1, 1, 1, 'halb finale'),
(1, 1, 2, 'halb finale'),
(1, 1, 3, ''),
(1, 1, 4, ''),
(1, 1, 5, ''),
(1, 1, 6, ''),
(1, 1, 7, ''),
(1, 2, 1, 'halb finale'),
(2, 2, 1, ''),
(2, 2, 2, ''),
(2, 2, 3, ''),
(2, 2, 4, ''),
(2, 2, 5, ''),
(3, 5, 1, ''),
(3, 5, 2, ''),
(3, 5, 3, ''),
(3, 5, 4, ''),
(3, 5, 5, ''),
(3, 5, 6, ''),
(4, 1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `tid` int(3) NOT NULL,
  `tname` char(20) NOT NULL,
  `tlocation` char(20) NOT NULL,
  `tactive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournaments`
--

INSERT INTO `tournaments` (`tid`, `tname`, `tlocation`, `tactive`) VALUES
(1, 'DM 2023', 'Monnem', 1),
(2, 'DM 2022', 'Schriesheim', 1),
(3, 'DM 2024', 'Hirschberg', 1),
(4, 'DM 2025', 'Heidelberg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `tid` int(3) NOT NULL,
  `trackid` int(3) NOT NULL,
  `currentgroup` int(2) NOT NULL,
  `label` char(1) NOT NULL,
  `trackdescription` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`tid`, `trackid`, `currentgroup`, `label`, `trackdescription`) VALUES
(1, 1, 0, 'A', 'Filz'),
(1, 2, 0, 'B', 'Minigolf'),
(1, 23, 0, 'C', 'Golf'),
(1, 24, 0, 'D', 'Kinderbahn'),
(2, 7, 0, 'a', 'test'),
(2, 8, 0, 'A', 'Filz'),
(2, 9, 0, 'A', 'Filz');

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
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`startorder`,`track`,`startgroup`,`player`) USING BTREE;

--
-- Indexes for table `indvgroups`
--
ALTER TABLE `indvgroups`
  ADD PRIMARY KEY (`startorder`,`comptype`,`gender`,`player`);

--
-- Indexes for table `matchdays`
--
ALTER TABLE `matchdays`
  ADD PRIMARY KEY (`tid`,`mdnumber`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`playernumber`);

--
-- Indexes for table `rounds`
--
ALTER TABLE `rounds`
  ADD PRIMARY KEY (`tid`,`mdnumber`,`rnumber`);

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
  MODIFY `cid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `tid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `trackid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clubs`
--
ALTER TABLE `clubs`
  ADD CONSTRAINT `tournament id` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`);

--
-- Constraints for table `matchdays`
--
ALTER TABLE `matchdays`
  ADD CONSTRAINT `matchdays_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`);

--
-- Constraints for table `rounds`
--
ALTER TABLE `rounds`
  ADD CONSTRAINT `rounds_ibfk_1` FOREIGN KEY (`tid`,`mdnumber`) REFERENCES `matchdays` (`tid`, `mdnumber`);

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tournaments` (`tid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

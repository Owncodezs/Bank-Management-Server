-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2022 at 05:22 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `cif_id` int(11) NOT NULL,
  `ac_no` int(9) NOT NULL,
  `balance` int(20) NOT NULL,
  `acount_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`cif_id`, `ac_no`, `balance`, `acount_type`) VALUES
(1001, 2001, 200, 'ca'),
(1002, 2002, 3900, 'ca'),
(1234, 9876, 900, 'ca');

-- --------------------------------------------------------

--
-- Table structure for table `cif`
--

CREATE TABLE `cif` (
  `cif_id` int(11) NOT NULL,
  `fist_name` varchar(15) NOT NULL,
  `last_name` varchar(5) NOT NULL,
  `custermer_type` varchar(10) NOT NULL,
  `street` varchar(20) NOT NULL,
  `city` varchar(10) NOT NULL,
  `state` varchar(10) NOT NULL,
  `zip` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cif`
--

INSERT INTO `cif` (`cif_id`, `fist_name`, `last_name`, `custermer_type`, `street`, `city`, `state`, `zip`) VALUES
(1001, 'kiko', 'g', 'ca', 'no', 'no', 'no', 638002),
(1002, 'ludena', 'm', 'ca', 'yes', 'yes', 'yes', 638003),
(1234, 'kali', 'k', 'minors', 'ee', 'ee', 'ee', 638001);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `cif_id` int(11) NOT NULL,
  `ac_no` int(9) NOT NULL,
  `password` text CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `lastlogin` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `data` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`cif_id`, `ac_no`, `password`, `lastlogin`, `data`) VALUES
(1234, 9876, '$2a$10$eVVgej1COrDcMfWzBsU6k.vKwjSAxlZbRbjQ0T5My7tyDSEX/0/pG', '2022-09-10 05:35:08', 1),
(1001, 2001, '$2a$10$B5/n0d/sLpItJgNOq00C2O1iXOn50ogU/O2omg/91jivKurw4v.fW', '2022-09-08 15:22:07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payer`
--

CREATE TABLE `payer` (
  `ac_no` int(9) NOT NULL,
  `payer_name` varchar(20) NOT NULL,
  `payer_acno` int(9) NOT NULL,
  `active` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payer`
--

INSERT INTO `payer` (`ac_no`, `payer_name`, `payer_acno`, `active`) VALUES
(2001, 'ludena', 2002, '2022-09-10 03:54:34'),
(9876, 'kiko', 2001, '2022-09-11 14:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `statement`
--

CREATE TABLE `statement` (
  `ref_no` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ac_no` int(9) NOT NULL,
  `particulars` text DEFAULT NULL,
  `debit` int(20) DEFAULT NULL,
  `credit` int(20) DEFAULT NULL,
  `balance` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `statement`
--

INSERT INTO `statement` (`ref_no`, `date`, `ac_no`, `particulars`, `debit`, `credit`, `balance`) VALUES
(1, '2022-09-09 14:48:59', 2001, 'NIFTY out', NULL, 100, 800),
(2, '2022-09-09 14:48:59', 2002, 'NIFTY in', 100, NULL, 2200),
(3, '2022-09-09 16:06:38', 2002, 'NIFTY out', NULL, 100, 2100),
(4, '2022-09-09 16:06:38', 2001, 'NIFTY in', 100, NULL, 900),
(5, '2022-09-09 16:09:18', 2002, 'NIFTY out', NULL, 100, 2000),
(6, '2022-09-09 16:09:19', 2001, 'NIFTY in', 100, NULL, 1000),
(7, '2022-09-10 00:59:54', 2001, 'NIFTY out', NULL, 200, 800),
(8, '2022-09-10 00:59:54', 2002, 'NIFTY in', 200, NULL, 2200),
(9, '2022-09-10 01:01:26', 2001, 'NIFTY out', NULL, 200, 600),
(10, '2022-09-10 01:01:26', 2002, 'NIFTY in', 200, NULL, 2400),
(11, '2022-09-10 01:01:34', 2001, 'NIFTY out', NULL, 200, 400),
(12, '2022-09-10 01:01:34', 2002, 'NIFTY in', 200, NULL, 2600),
(13, '2022-09-10 01:03:13', 2001, 'NIFTY out', NULL, 200, 200),
(14, '2022-09-10 01:03:13', 2002, 'NIFTY in', 200, NULL, 2800),
(15, '2022-09-10 01:03:26', 2001, 'NIFTY out', NULL, 200, 0),
(16, '2022-09-10 01:03:26', 2002, 'NIFTY in', 200, NULL, 3000),
(17, '2022-09-10 01:05:04', 2001, 'NIFTY out', NULL, 200, 800),
(18, '2022-09-10 01:05:04', 2002, 'NIFTY in', 200, NULL, 3200),
(19, '2022-09-10 01:07:07', 2001, 'NIFTY out', NULL, 200, 600),
(20, '2022-09-10 01:07:07', 2002, 'NIFTY in', 200, NULL, 3400),
(21, '2022-09-10 01:10:02', 2001, 'NIFTY out', NULL, 200, 400),
(22, '2022-09-10 01:10:02', 2002, 'NIFTY in', 200, NULL, 3600),
(23, '2022-09-10 01:10:39', 2001, 'NIFTY out', NULL, 200, 200),
(24, '2022-09-10 01:10:39', 2002, 'NIFTY in', 200, NULL, 3800),
(25, '2022-09-10 01:11:08', 2001, 'NIFTY out', NULL, 200, 0),
(26, '2022-09-10 01:11:08', 2002, 'NIFTY in', 200, NULL, 4000),
(27, '2022-09-11 13:26:16', 2002, 'NIFTY out', NULL, 200, 3800),
(28, '2022-09-11 13:26:16', 2001, 'NIFTY in', 200, NULL, 200),
(29, '2022-09-11 13:31:44', 2001, 'NIFTY out', NULL, 100, 100),
(30, '2022-09-11 13:31:44', 2002, 'NIFTY in', 100, NULL, 3900),
(31, '2022-09-11 14:17:47', 9876, 'NIFTY out', NULL, 100, 900),
(32, '2022-09-11 14:17:47', 2001, 'NIFTY in', 100, NULL, 200);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_no`),
  ADD KEY `cif_id` (`cif_id`);

--
-- Indexes for table `cif`
--
ALTER TABLE `cif`
  ADD PRIMARY KEY (`cif_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD KEY `log` (`ac_no`);

--
-- Indexes for table `statement`
--
ALTER TABLE `statement`
  ADD PRIMARY KEY (`ref_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `statement`
--
ALTER TABLE `statement`
  MODIFY `ref_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`cif_id`) REFERENCES `cif` (`cif_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

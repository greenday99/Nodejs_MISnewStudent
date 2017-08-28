-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-06-13 08:48:18
-- 伺服器版本: 10.1.10-MariaDB
-- PHP 版本： 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `fju`
--

-- --------------------------------------------------------

--
-- 資料表結構 `im_activity`
--

CREATE TABLE `im_activity` (
  `IMACT_TYPE` varchar(10) NOT NULL,
  `IMACT_NAME` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `im_activity`
--

INSERT INTO `im_activity` (`IMACT_TYPE`, `IMACT_NAME`) VALUES
('A', '2016資韻獎決賽'),
('B', '2016資韻獎初賽'),
('C', '2015博弈大賽之誰是大老二'),
('D', '2015博弈大賽之聽牌囉'),
('E', '2015宿營第三天'),
('F', '2015宿營第二天'),
('G', '2015宿營第一天'),
('H', '系烤');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `im_activity`
--
ALTER TABLE `im_activity`
  ADD PRIMARY KEY (`IMACT_TYPE`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

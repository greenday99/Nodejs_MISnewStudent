-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-05-27 17:48:33
-- 伺服器版本: 10.1.10-MariaDB
-- PHP 版本： 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `class`
--

-- --------------------------------------------------------

--
-- 資料表結構 `lesson_interview`
--

CREATE TABLE `lesson_interview` (
  `interview_id` int(11) NOT NULL,
  `center_class` varchar(20) CHARACTER SET utf8 NOT NULL,
  `class_interview` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `lesson_interview`
--

INSERT INTO `lesson_interview` (`interview_id`, `center_class`, `class_interview`) VALUES
(1, 'JAVA程式設計123 ', 'Java是屬於易學、跨平台的程式語言，是資管系很重視的程式語言，其中 Java提供的物件在使用上相當便利，尤勝於其他程式語言。而這也意味了Java在高階語言尤其是網際網路的應用上，符合了開發時間短、可再用性高、成本低廉…等Java是屬於易學、跨平台的程式語言，是資管系很重視的程式語言，其中 Java提供的物件在使用上相當便利，尤勝於其他程式語言。而這也意味了Java在高階語言尤其是網際網路的應用上，符合了開發時間短、可再用性高、成本低廉…等Java是屬於易學、跨平台的程式語言，是資管系很重視的程式語言，其中 Java提供的物件在使用上相當便利，尤勝於其他程式語言。而這也意味了Java在高階語言尤其是網際網路的應用上，符合了開發時間短、可再用性高、成本低廉…等'),
(2, '資料庫管理系統', '本課程提供基本概念和設計，實施和管理數據庫系統原理。內容包括數據庫的概念，關係型數據庫的設計理念，結構化查詢語言（SQL）數據庫管理。一個DBMS將納入課程練習，並作為一個數據庫系統的設計和實施項目的一部分。'),
(3, '資訊安全123', '本課程提供基本概念和設計，實施和管理數據庫系統原理。內容包括數據庫的概念，關係型數據庫的設計理念，結構化查詢語言（SQL）數據庫管理。一個DBMS將納入課程練習，並作為一個數據庫系統的設計和實施項目的一部分。本課程將引導同學學習資訊安全之相關課題，提供資訊安全的基本概念、系統安全並學習如何應用密碼學(古典密碼學、近代密碼學與量子密碼學)以及網路安全技術，提升學生的資訊安全意識，建立起正確的資安觀念。'),
(4, '資料結構', '本課程提供的數據結構的基本概念和計算機科學的算法。主題包括介紹基本的數據結構和基本算法，採用不同的表現模式的比較數據結構，探索不同的排序和搜索方法的研究。在一種編程語言的實現和數據結構的應用程序進行的，訓練學生解決問題的邏輯思考能力。'),
(5, '經濟學', '本課程為社會科學的一部分，目的是介紹經濟學家如何探討個人在各種組織與市場結構之 選擇行為，尋求事件的真理，研究如何分配其有限的資源，滿足人類無限的慾望；如何運用經濟學之分析工具來瞭解各種經濟現象。'),
(6, '微積分', '本課程教導學生了解微積分的基本概念及其在管理上的應用；介紹基礎微積分，函數之極限與連續、導函數之基本運算理論、導函數之應用、積分之基本運算理論、反函數及其導函數、積分技巧、積分應用。'),
(7, '統計學', '本課程的目的是為學生提供基本統計的本質和基本概念。本課程旨在強調的統計程序和公式背後的邏輯原則一個直觀的了解。介紹了許多來自各個領域的實際問題和例子可供選擇。它強調統計用作決策管理科學的幾乎所有領域的工具。'),
(8, 'Ｃ程式語言', '程式開發工程仍為市場上佔最大的程式開發人才，本課程讓學生了解程式設計的原理與方法，培養學生善用資訊科技以統整資源的能力；厚植學生管理與資訊之專業知識與技能；培養學生應用資訊科技解決組織管理問題的能力。');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `lesson_interview`
--
ALTER TABLE `lesson_interview`
  ADD PRIMARY KEY (`interview_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

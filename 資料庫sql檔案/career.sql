-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-06-12 15:25:12
-- 伺服器版本: 10.1.10-MariaDB
-- PHP 版本： 7.0.3

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
-- 資料表結構 `career`
--

CREATE TABLE `career` (
  `CAREER_ID` int(11) NOT NULL,
  `CAREER_ORDER` int(11) NOT NULL,
  `CAREER_TITLE` text NOT NULL,
  `CAREER_SUBTITLE` text NOT NULL,
  `CAREER_CONTENT_TEXT` text NOT NULL,
  `CAREER_IMG` text NOT NULL,
  `CAREER_CONTENT` text NOT NULL,
  `CAREER_TYPE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `career`
--

INSERT INTO `career` (`CAREER_ID`, `CAREER_ORDER`, `CAREER_TITLE`, `CAREER_SUBTITLE`, `CAREER_CONTENT_TEXT`, `CAREER_IMG`, `CAREER_CONTENT`, `CAREER_TYPE`) VALUES
(1, 2, '網路安全分析師', '平均月薪: 55953 元', '依據網際網路資訊系統之特性與需要，設計網路安全系統與防火牆、防範電腦病毒、偵錯、測試及安裝等工作。 (資料來源:104人力銀行)', '/img/career_img/programer1.jpg', '/img/career_img/programer1L.jpg', ''),
(2, 3, 'MIS／網管主管', '平均月薪: 56052 元', '計畫、主持或協調與電子資料、資訊系統、系統分析或電腦程式設計相關之活動。(資料來源:104人力銀行)', '/img/career_img/manager2.jpg', '/img/career_img/manager2L.jpg', ''),
(3, 4, '資料庫管理人員', '平均月薪: 50033 元', '負責資料庫規劃、管理、資料備援、效能調校及安全管理等工作，以維護資料庫正常運行。(資料來源:104人力銀行)', '/img/career_img/data_center.jpg', '/img/career_img/data_centerL.jpg', ''),
(4, 5, 'MIS程式設計師', '平均月薪: 43120 元', '負責MIS系統的運作，同時管理與維護公司的系統架構、網路架構、防毒措施等。(資料來源:104人力銀行)', '/img/career_img/programer3.jpg', '/img/career_img/programer3L.jpg', ''),
(5, 6, '網頁設計師', '平均月薪: 37210 元', '設計公司形象之視覺規範、視覺設計，以及網站視覺規劃與網頁製作等事務(資料來源:104人力銀行)', '/img/career_img/web.jpg', '/img/career_img/webL.jpg', ''),
(6, 7, '演算法開發工程師', '平均月薪: 63248 元', '從事有關演算法之研究、發展、設計、構建、操作、驗證等工作。(資料來源:104人力銀行)', '/img/career_img/formula.jpg', '/img/career_img/formulaL.jpg', ''),
(7, 8, '資訊助理人員', '平均月薪: 28253 元', '在系統分析工程師的指導下，從事系統軟體開發、資料管理及維護等資訊相關工作。(資料來源:104人力銀行)', '/img/career_img/assistant2.jpg', '/img/career_img/assistant2L.jpg', ''),
(8, 0, '電玩程式設計師', '平均月薪: 44182 元', '依電腦遊戲之規則、故事性與趣味性，從事電腦遊戲軟體之設計、修改、測試、偵錯及安裝等工作。(資料來源:104人力銀行)', '/img/career_img/game.jpg', '/img/career_img/gameL.jpg', ''),
(9, 0, '網路管理工程師', '平均月薪: 40395 元', '分析、設計、測試以及維護公司企業網路系統，如：區域網路（LAN）、WAN、網際網路，內部網和其他數據通信系統。(資料來源:104人力銀行)', '/img/career_img/programer2.jpg', '/img/career_img/programer2L.jpg', ''),
(10, 0, '資訊設備管制人員', '平均月薪: 33610 元', '在資訊專業人員指導監督下，協助電腦與週邊設備之操作及管理等工作。(資料來源:104人力銀行)', '/img/career_img/equipment1.jpg', '/img/career_img/equipment1L.jpg', ''),
(11, 0, '軟體專案主管', '平均月薪: 73299 元', '負責計劃、指揮及協調與電腦系統、軟體相關之專案，並管理部門日常活動(資料來源:104人力銀行)', '/img/career_img/office1.jpg', '/img/career_img/office1L.jpg', ''),
(12, 0, '軟體設計工程師', '平均月薪: 48546 元', '負責軟體的分析、設計、程式撰寫與維護，並進行軟體的測試與修改，以及控管軟體設計進度。(資料來源:104人力銀行)', '/img/career_img/programer4.jpg', '/img/career_img/programer4L.jpg', ''),
(16, 1, '各業員工每月平均薪資', '(單位:新台幣)', '資料由 行政院主計總處 提供', '/img/career_img/salary.jpg', '/chart2_1_4.html', 'iframe');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`CAREER_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

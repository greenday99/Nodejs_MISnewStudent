# Host: localhost  (Version 5.6.27-enterprise-commercial-advanced-log)
# Date: 2016-06-14 17:37:27
# Generator: MySQL-Front 5.3  (Build 5.39)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "newstudent_news_class"
#

DROP TABLE IF EXISTS `newstudent_news_class`;
CREATE TABLE `newstudent_news_class` (
  `NEWS_CLASS_CODE` int(11) NOT NULL DEFAULT '0',
  `NEWS_CLASS_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`NEWS_CLASS_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "newstudent_news_class"
#

INSERT INTO `newstudent_news_class` VALUES (1,'其他'),(2,'招生日程'),(3,'榜單公佈');

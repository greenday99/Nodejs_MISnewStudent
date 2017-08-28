# Host: localhost  (Version 5.6.27-enterprise-commercial-advanced-log)
# Date: 2016-06-14 17:37:36
# Generator: MySQL-Front 5.3  (Build 5.39)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "newstudent_timeline"
#

DROP TABLE IF EXISTS `newstudent_timeline`;
CREATE TABLE `newstudent_timeline` (
  `TIMELINE_CODE` int(11) NOT NULL AUTO_INCREMENT,
  `NEWS_CODE` int(11) DEFAULT NULL,
  `LDAP` varchar(255) DEFAULT NULL,
  `START_DATE` varchar(255) DEFAULT NULL,
  `START_TIME` varchar(255) DEFAULT NULL,
  `TIMELINE_TITLE` varchar(255) DEFAULT NULL,
  `TIMELINE_LOCATION` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TIMELINE_CODE`),
  KEY `FK_NEWS_CODE` (`NEWS_CODE`),
  CONSTRAINT `FK_NEWS_CODE` FOREIGN KEY (`NEWS_CODE`) REFERENCES `newstudent_news` (`NEWS_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Data for table "newstudent_timeline"
#

INSERT INTO `newstudent_timeline` VALUES (1,1,'admin','2016-06-01','00:00','招生開始了','羅耀拉LM201'),(4,8,NULL,'2016-06-02','00:00','新增',''),(5,9,NULL,'2016-06-30','09:00','測試2修改時間軸',''),(6,10,NULL,'2016-06-24','09:00','測試3改改時間軸','');

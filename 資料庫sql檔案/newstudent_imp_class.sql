# Host: localhost  (Version 5.6.27-enterprise-commercial-advanced-log)
# Date: 2016-06-14 17:37:11
# Generator: MySQL-Front 5.3  (Build 5.39)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "newstudent_imp_class"
#

DROP TABLE IF EXISTS `newstudent_imp_class`;
CREATE TABLE `newstudent_imp_class` (
  `IMP_CLASS_CODE` int(11) NOT NULL DEFAULT '0',
  `IMP_CLASS_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IMP_CLASS_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "newstudent_imp_class"
#

INSERT INTO `newstudent_imp_class` VALUES (0,'普通'),(1,'重要'),(2,'非常重要');

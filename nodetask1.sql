/*
SQLyog Ultimate v9.02 
MySQL - 5.0.24-community-nt : Database - nodeapp
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodeapp` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `nodeapp`;

/*Table structure for table `personal_details` */

DROP TABLE IF EXISTS `personal_details`;

CREATE TABLE `personal_details` (
  `per_id` int(255) NOT NULL auto_increment,
  `user_id` int(255) default NULL,
  `hobbies` text NOT NULL,
  `address` text NOT NULL,
  `profile_pic` blob,
  `created_on` datetime NOT NULL,
  PRIMARY KEY  (`per_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `FK_personal_details` FOREIGN KEY (`user_id`) REFERENCES `registration_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `personal_details` */

insert  into `personal_details`(`per_id`,`user_id`,`hobbies`,`address`,`profile_pic`,`created_on`) values (3,28,'Chess,Cricket','209 , Utsav Residancy , malharganj , Kumar mohalla,Indore, ','','2020-09-22 10:27:27'),(4,29,'Chess,Cricket','209 , Utsav Residancy , malharganj , Kumar mohalla,Indore, ','','2020-09-22 11:27:43'),(5,30,'Chess,Cricket','209 , Utsav Residancy , malharganj , Kumar mohalla,Indore, ','','2020-09-22 12:30:27'),(6,31,'Chess,Cricket','209 , Utsav Residancy , malharganj , Kumar mohalla,Indore, ','','2020-09-22 12:59:28');

/*Table structure for table `registration_details` */

DROP TABLE IF EXISTS `registration_details`;

CREATE TABLE `registration_details` (
  `user_id` int(255) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `step_no` int(1) NOT NULL,
  `registration_complete` tinyint(1) NOT NULL,
  `last_login_time` datetime NOT NULL,
  `created_date` datetime NOT NULL,
  `session_id` text NOT NULL,
  PRIMARY KEY  (`user_id`),
  UNIQUE KEY `email_id_unk` (`email_id`),
  UNIQUE KEY `email_id_unique` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `registration_details` */

insert  into `registration_details`(`user_id`,`name`,`email_id`,`password`,`step_no`,`registration_complete`,`last_login_time`,`created_date`,`session_id`) values (28,'Yash Soni','yash42408@gmail.com','442201394da9de9678185e7914ee31e0878340354dc339a72f77705005911cafa1350b05f3787f5bf36deafea464c03c2fe99fb5ba3a4112a631b94abaf212d63e5b89b0be8897d9478ed920f8090967cc599c201112ad733a8a626ffdd022bfb07078da5074',2,1,'2020-09-22 10:27:04','2020-09-22 10:27:04','3f6304b840197ced4b219de4fc2abad5c705e64501c6ad8ad4b2729c3a3a27c4'),(29,'Yash Soni','yash408@gmail.com','ee20e7747721c52dbd2f71a552956188541a8d033768a148c253f95f266c16c83223c7952e9d94d719ab707af0231296730f68a519c5f22fed1002c9e78b9bf751de47c5b209a4f5c6c61b80f3165e777548ef26965f40d0f928a86a9bb4752299691fb0e4162353a8',2,1,'2020-09-22 11:26:07','2020-09-22 11:26:07','470fda053ca91afc13739eb1eedfd8648fbe4bbb2bf0f5e49cfed13daf18060f'),(30,'Yash Soni','yashsoni@gmail.com','b4907aeaf2499d3c9d256b2fac77613bc17ed80000c9c2de35b801992824b25c44822ff2ba90eab728aeb55d2b05635ff665f07873d79e4a009e49442cdfbdb0958e47ec27c09ae0bf96bdc1e6c1c9973fcadf29f6998c6f20d217eec627e3c9345b85979899',2,1,'2020-09-22 12:29:58','2020-09-22 12:29:58','15aba1b7e8b2709723a7a09c63b0b92d4af012e8e36461c8626bd0aeaf5b56c3'),(31,'Yash Soni','yashsoni0106@gmail.com','e363eee50c6e7b8096134fb7155179fb9039e244578e8d77d06556137cc9f6b945a08700779756eefd7909c0c973d051a898f51f85188470324161fc572cda8b9f33c5291abf4db2ca6473e70effff5b32476c69fe7df710c976bd8830003879a8e6ee8ceabb',2,1,'2020-09-22 12:59:02','2020-09-22 12:59:02','864d184ca9e55d8aba0fc1a28171e78b7aed00309aeef29e723cd409dfc0deb7');

/*Table structure for table `university_details` */

DROP TABLE IF EXISTS `university_details`;

CREATE TABLE `university_details` (
  `uni_id` int(255) NOT NULL auto_increment,
  `user_id` int(255) default NULL,
  `university_name` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `start_year` int(4) NOT NULL,
  `end_year` int(4) NOT NULL,
  `created_on` datetime NOT NULL,
  PRIMARY KEY  (`uni_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `NewIndex1` (`user_id`),
  CONSTRAINT `FK_university_details` FOREIGN KEY (`user_id`) REFERENCES `registration_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `university_details` */

insert  into `university_details`(`uni_id`,`user_id`,`university_name`,`degree`,`start_year`,`end_year`,`created_on`) values (2,28,'Sri Aurobindo Institute Of Technology , Indore','B.E.',2016,2020,'2020-09-22 10:27:20'),(3,29,'Sri Aurobindo Institute Of Technology , Indore','B.E.',2016,2020,'2020-09-22 11:27:05'),(4,30,'Sri Aurobindo Institute Of Technology , Indore','B.E.',2020,2020,'2020-09-22 12:30:20'),(5,31,'Sri Aurobindo Institute Of Technology , Indore','B.E.',2016,2020,'2020-09-22 12:59:14');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

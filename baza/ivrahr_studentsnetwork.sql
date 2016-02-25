-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Računalo: localhost
-- Vrijeme generiranja: Velj 11, 2016 u 08:54 AM
-- Verzija poslužitelja: 5.5.42-cll
-- PHP verzija: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza podataka: `ivrahr_studentsnetwork`
--

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `city_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `tribal_state` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`city_ID`),
  KEY `cities_trbal_stateFK_idx` (`tribal_state`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Izbacivanje podataka za tablicu `cities`
--

INSERT INTO `cities` (`city_ID`, `name`, `tribal_state`) VALUES
(1, 'city_proba', 1),
(2, 'Šibenik', 16),
(3, 'Varaždin', 6);

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `colleges`
--

CREATE TABLE IF NOT EXISTS `colleges` (
  `college_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `abbr` varchar(10) DEFAULT NULL,
  `university` int(10) unsigned NOT NULL,
  `city` int(10) unsigned NOT NULL,
  `email_domain` varchar(10) DEFAULT NULL COMMENT '@<college_domain>.hr  e.g. @foi.hr,@fsb.hr,@ffzg.hr',
  PRIMARY KEY (`college_ID`),
  KEY `colleges_universityFK_idx` (`university`),
  KEY `colleges_cityFK_idx` (`city`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Izbacivanje podataka za tablicu `colleges`
--

INSERT INTO `colleges` (`college_ID`, `name`, `abbr`, `university`, `city`, `email_domain`) VALUES
(1, 'collage_proba', 'asd', 1, 1, 'proba'),
(2, 'Veleučilište u Šibeniku', 'VUŠ', 3, 2, '@vus.hr'),
(3, 'Fakultet organizacije i informatike', 'FOI', 2, 3, '@foi.hr');

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
  `company_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `unique_ID` varchar(11) DEFAULT NULL,
  `city` int(10) unsigned DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `tribal_state` int(10) unsigned DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL COMMENT 'only phone numbers, without dashes and spaces',
  `fax_number` varchar(15) DEFAULT NULL COMMENT 'only fax number without dashes and spaces',
  `contact_person` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`company_ID`),
  KEY `companies_tribal_stateFK_idx` (`tribal_state`),
  KEY `companies_cityFK_idx` (`city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `dorms`
--

CREATE TABLE IF NOT EXISTS `dorms` (
  `dorm_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `city` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`dorm_ID`),
  KEY `dorms_cityFK_idx` (`city`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Izbacivanje podataka za tablicu `dorms`
--

INSERT INTO `dorms` (`dorm_ID`, `name`, `city`) VALUES
(1, 'dorm_proba', 1);

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
  `subject_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `max_years` int(10) unsigned NOT NULL DEFAULT '3',
  `type_of_study` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`subject_ID`),
  KEY `subjects_type_of_studyFK_idx` (`type_of_study`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;


-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `types_of_study`
--

CREATE TABLE IF NOT EXISTS `types_of_study` (
  `type_of_study_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`type_of_study_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Izbacivanje podataka za tablicu `types_of_study`
--

INSERT INTO `types_of_study` (`type_of_study_ID`, `name`) VALUES
(1, 'Preddiplomski sveučilišni studij'),
(2, 'Preddiplomski stručni studij');

-- --------------------------------------------------------

--
-- Izbacivanje podataka za tablicu `subjects`
--

INSERT INTO `subjects` (`subject_ID`, `name`, `max_years`, `type_of_study`) VALUES
(1, 'subject_proba', 3, NULL),
(2, 'Turistički menadžement', 3, 2),
(3, 'Informacijski i poslovni sustavi', 3, 1);

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `subject_in_college`
--

CREATE TABLE IF NOT EXISTS `subject_in_college` (
  `subject` int(10) unsigned NOT NULL,
  `college` int(10) unsigned NOT NULL,
  PRIMARY KEY (`subject`,`college`),
  KEY `subject_in_college_collegeFK_idx` (`college`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Izbacivanje podataka za tablicu `subject_in_college`
--

INSERT INTO `subject_in_college` (`subject`, `college`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `tribal_states`
--

CREATE TABLE IF NOT EXISTS `tribal_states` (
  `tribal_state_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`tribal_state_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Izbacivanje podataka za tablicu `tribal_states`
--

INSERT INTO `tribal_states` (`tribal_state_ID`, `name`) VALUES
(1, 'tribal_proba'),
(2, 'Zagrebačka'),
(3, 'Krapinsko-zagorska'),
(4, 'Sisačko-moslavačka'),
(5, 'Karlovačka'),
(6, 'Varaždinska'),
(7, 'Koprivničko-križevačka'),
(8, 'Bjelovarsko-bilogorska'),
(9, 'Primorsko-goranska'),
(10, 'Ličko-senjska'),
(11, 'Virovitičko-podravska'),
(12, 'Požeško-slavonska'),
(13, 'Brodsko-posavska'),
(14, 'Zadarska'),
(15, 'Osječko-baranjska'),
(16, 'Šibensko-kninska'),
(17, 'Vukovarsko-srijemska'),
(18, 'Splitsko-dalmatinska'),
(19, 'Istarska'),
(20, 'Dubrovačko-neretvanska'),
(21, 'Međimurska'),
(22, 'Grad Zagreb');



--
-- Tablična struktura za tablicu `universities`
--

CREATE TABLE IF NOT EXISTS `universities` (
  `university_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`university_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Izbacivanje podataka za tablicu `universities`
--

INSERT INTO `universities` (`university_ID`, `name`) VALUES
(1, 'university_proba'),
(2, 'Sveučilište u Zagrebu'),
(3, 'Veleučilište u Šibeniku');

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` text COMMENT 'hashed password',
  `university` int(10) unsigned DEFAULT NULL,
  `college` int(10) unsigned DEFAULT NULL,
  `city` int(10) unsigned DEFAULT NULL,
  `subject` int(10) unsigned DEFAULT NULL,
  `blocked` tinyint(4) DEFAULT '0',
  `activated` tinyint(4) DEFAULT '0',
  `role` int(11) DEFAULT '3' COMMENT '1 - admin\n2 - moderator\n3 - user',
  `mobile_number` varchar(30) DEFAULT NULL,
  `unique_ID` varchar(20) DEFAULT NULL COMMENT 'if full-time student then unique_ID is xica, else index number',
  `gender` char(1) DEFAULT NULL COMMENT 'M - for male\nF - for female',
  `registered_at` datetime DEFAULT NULL,
  `birthday_date` datetime DEFAULT NULL,
  `num_wrong_logins` int(10) unsigned DEFAULT '0',
  `dorm` int(10) unsigned DEFAULT NULL,
  `profile_picture` varchar(100) DEFAULT NULL,
  `secret_word` varchar(50) DEFAULT NULL,
  `college_year` varchar(45) DEFAULT NULL,
  `full_time_student` tinyint(4) DEFAULT '1' COMMENT 'if 1 then true, else false',
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `home_city` int(10) unsigned DEFAULT NULL,
  `type_of_study` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`user_ID`),
  KEY `users_universityFK_idx` (`university`),
  KEY `users_collegeFK_idx` (`college`),
  KEY `users_cityFK_idx` (`city`),
  KEY `users_subjectFK_idx` (`subject`),
  KEY `users_dormFK_idx` (`dorm`),
  KEY `users_home_cityFK_idx` (`home_city`),
  KEY `users_type_of_studyFK_idx` (`type_of_study`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Izbacivanje podataka za tablicu `users`
--

INSERT INTO `users` (`user_ID`, `email`, `password`, `university`, `college`, `city`, `subject`, `blocked`, `activated`, `role`, `mobile_number`, `unique_ID`, `gender`, `registered_at`, `birthday_date`, `num_wrong_logins`, `dorm`, `profile_picture`, `secret_word`, `college_year`, `full_time_student`, `name`, `surname`, `home_city`, `type_of_study`) VALUES
(1, 'proba@mail.com', '123', 1, 1, 1, 1, 0, 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, NULL, NULL, 1, 'name_proba', 'surname_proba', 1, NULL);

--
-- Ograničenja za izbačene tablice
--

--
-- Ograničenja za tablicu `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_trbal_stateFK` FOREIGN KEY (`tribal_state`) REFERENCES `tribal_states` (`tribal_state_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograničenja za tablicu `colleges`
--
ALTER TABLE `colleges`
  ADD CONSTRAINT `colleges_universityFK` FOREIGN KEY (`university`) REFERENCES `universities` (`university_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `colleges_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograničenja za tablicu `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_tribal_stateFK` FOREIGN KEY (`tribal_state`) REFERENCES `tribal_states` (`tribal_state_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `companies_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograničenja za tablicu `dorms`
--
ALTER TABLE `dorms`
  ADD CONSTRAINT `dorms_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograničenja za tablicu `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_type_of_studyFK` FOREIGN KEY (`type_of_study`) REFERENCES `types_of_study` (`type_of_study_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograničenja za tablicu `subject_in_college`
--
ALTER TABLE `subject_in_college`
  ADD CONSTRAINT `subject_in_college_subjectFK` FOREIGN KEY (`subject`) REFERENCES `subjects` (`subject_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `subject_in_college_collegeFK` FOREIGN KEY (`college`) REFERENCES `colleges` (`college_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograničenja za tablicu `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_universityFK` FOREIGN KEY (`university`) REFERENCES `universities` (`university_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_collegeFK` FOREIGN KEY (`college`) REFERENCES `colleges` (`college_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_subjectFK` FOREIGN KEY (`subject`) REFERENCES `subjects` (`subject_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_dormFK` FOREIGN KEY (`dorm`) REFERENCES `dorms` (`dorm_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_home_cityFK` FOREIGN KEY (`home_city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_type_of_studyFK` FOREIGN KEY (`type_of_study`) REFERENCES `types_of_study` (`type_of_study_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

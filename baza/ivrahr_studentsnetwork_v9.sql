-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2016 at 09:58 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ivrahr_studentsnetwork`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `city_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `tribal_state` int(10) unsigned DEFAULT NULL,
  `universities` text COMMENT 'universities in the city formated as string of IDs separated with commas'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_ID`, `name`, `tribal_state`, `universities`) VALUES
(2, 'Šibenik', 16, '3'),
(3, 'Varaždin', 6, '2,4'),
(4, 'Zagreb', 22, '2');

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE IF NOT EXISTS `colleges` (
  `college_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `abbr` varchar(10) DEFAULT NULL,
  `university` int(10) unsigned NOT NULL,
  `city` int(10) unsigned NOT NULL,
  `email_domain` varchar(10) DEFAULT NULL COMMENT '<college_domain>.hr  e.g. foi.hr,fsb.hr,ffzg.hr',
  `types_of_study` text COMMENT 'id of types of study as one string separated by comma'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`college_ID`, `name`, `abbr`, `university`, `city`, `email_domain`, `types_of_study`) VALUES
(2, 'Veleučilište u Šibeniku', 'VUŠ', 3, 2, 'vus.hr', '2'),
(3, 'Fakultet organizacije i informatike', 'FOI', 2, 3, 'foi.hr', '1,2,3'),
(4, 'Geotehnički fakultet', 'GFV', 2, 3, 'gfk.hr', '1');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_ID` int(10) unsigned NOT NULL,
  `text` text,
  `author` int(10) unsigned DEFAULT NULL,
  `likes` int(10) unsigned DEFAULT '0',
  `post` int(10) unsigned DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_ID`, `text`, `author`, `likes`, `post`, `time`) VALUES
(40, 'koment', 7, 0, 52, '2016-03-18 15:38:39'),
(49, 'gygyg', 7, 0, 56, '2016-03-18 16:03:20'),
(50, 'jebi seee', 5, 0, 65, '2016-03-18 16:10:20'),
(51, 'sve bas lahko', 5, 0, 65, '2016-03-18 16:11:08'),
(52, 'svee bas lahko', 7, 0, 65, '2016-03-18 16:11:19'),
(53, 'jala brat', 5, 0, 65, '2016-03-18 16:11:27'),
(54, 'teee', 7, 0, 65, '2016-03-18 23:09:37'),
(55, 'Koment lola', 7, 0, 66, '2016-03-20 16:08:30'),
(56, 'tito, mito', 6, 0, 66, '2016-03-20 16:10:10'),
(57, ':P', 7, 0, 66, '2016-03-20 16:33:49'),
(58, 'ssadsad', 7, 0, 64, '2016-03-20 16:33:59'),
(59, 'sadsd', 7, 0, 66, '2016-03-20 16:34:22'),
(60, 'aasdsad', 7, 0, 65, '2016-03-20 19:35:03'),
(61, 'sadsadasd', 7, 0, 50, '2016-03-20 19:35:15'),
(62, 'sdadad', 7, 0, 67, '2016-03-20 19:42:39'),
(63, 'sadsads', 7, 0, 67, '2016-03-20 19:42:51'),
(64, 'komentar', 7, 0, 70, '2016-03-20 19:48:05'),
(65, 'kekeke', 7, 0, 73, '2016-03-20 19:57:09'),
(66, 'asdsada', 7, 0, 74, '2016-03-20 19:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
  `company_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `unique_ID` varchar(11) DEFAULT NULL,
  `city` int(10) unsigned DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `tribal_state` int(10) unsigned DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(30) DEFAULT NULL COMMENT 'only phone numbers, without dashes and spaces',
  `fax_number` varchar(30) DEFAULT NULL COMMENT 'only fax number without dashes and spaces',
  `contact_person` varchar(200) DEFAULT NULL,
  `password` text,
  `registered_at` datetime DEFAULT NULL,
  `num_wrong_logins` int(11) DEFAULT '0',
  `blocked` tinyint(4) DEFAULT '0',
  `activation_link` text,
  `activated` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_ID`, `name`, `unique_ID`, `city`, `address`, `zip_code`, `tribal_state`, `email`, `phone_number`, `fax_number`, `contact_person`, `password`, `registered_at`, `num_wrong_logins`, `blocked`, `activation_link`, `activated`) VALUES
(1, 'Testna d.o.o.', '02024882311', 3, 'Pavlinska 2a', '42000', 6, 'testna@foi.hr', '0987654', '0987654', 'Strahonja', 'lozinka92', '2016-02-23 12:34:32', 0, 0, NULL, 0),
(2, 'test2', '02024882313', 4, 'dkgdl', '10000', 22, 'mail@gmail.com', '987654', 'NULL', 'Danijel', 'lozinka292', '2016-02-23 12:38:24', 0, 0, NULL, 0),
(3, 'Testna3', '02024882310', 3, 'Neka ulica', '42000', 6, 'mail@mail.com', '098765', '098765', 'Danijel', 'lozinka992', '2016-02-24 10:29:44', 0, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
  `course_ID` int(11) unsigned NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `subject` int(11) unsigned DEFAULT NULL,
  `semester` int(1) NOT NULL,
  `year` int(2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_ID`, `name`, `subject`, `semester`, `year`) VALUES
(1, 'Uvod u IT', 2, 2, 1),
(3, 'lalall lpredmet....', 2, 2, 1),
(4, 'neki tamo predmet na faksu 2', 2, 1, 2),
(5, 'neki tamo predmet na faksu3', 2, 2, 2),
(6, 'neki tamo predmet na faksu 33', 2, 1, 1),
(7, 'neki tamo predmet na faksu 22', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dorms`
--

CREATE TABLE IF NOT EXISTS `dorms` (
  `dorm_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dorms`
--

INSERT INTO `dorms` (`dorm_ID`, `name`, `city`) VALUES
(2, 'Studentski dom Varaždin', 3);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE IF NOT EXISTS `friends` (
  `owner` int(10) unsigned NOT NULL COMMENT 'The person who sends the request',
  `friend` int(10) unsigned NOT NULL COMMENT 'The person who receives the request',
  `time` datetime DEFAULT NULL,
  `blocked` tinyint(4) DEFAULT '0',
  `pending` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1 - yes, 0 - no',
  `accepted_at` datetime DEFAULT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`owner`, `friend`, `time`, `blocked`, `pending`, `accepted_at`, `seen`) VALUES
(1, 6, '2016-03-20 20:56:20', 0, 1, NULL, 0),
(1, 7, '2016-03-18 15:56:24', 0, 0, '2016-03-18 16:00:47', 0),
(2, 5, '2016-02-09 00:00:00', 0, 0, '2016-03-18 15:59:51', 0),
(2, 6, '2016-03-20 20:56:20', 0, 1, NULL, 0),
(5, 7, '2016-03-18 16:00:23', 0, 1, NULL, 0),
(7, 6, '2016-03-20 20:56:20', 0, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_ID` int(10) unsigned NOT NULL,
  `owner` int(10) unsigned DEFAULT NULL,
  `sender` int(10) unsigned DEFAULT NULL,
  `link_target` int(10) unsigned DEFAULT NULL,
  `received_at` datetime DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL,
  `seen` tinyint(4) DEFAULT '0' COMMENT '1 - yes, 0 - no',
  `notification_type` tinyint(4) DEFAULT '0' COMMENT '0 - notification , 1 - friend request'
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_ID`, `owner`, `sender`, `link_target`, `received_at`, `sent_at`, `seen`, `notification_type`) VALUES
(15, 7, 6, 40, '2016-03-18 15:22:38', NULL, 1, 0),
(16, 6, 7, NULL, '2016-03-18 15:23:57', NULL, 1, 1),
(17, 2, 5, NULL, '2016-03-18 15:59:51', NULL, 1, 1),
(18, 7, 5, NULL, '2016-03-18 15:59:54', NULL, 1, 1),
(19, 1, 7, NULL, '2016-03-18 16:00:47', NULL, 0, 1),
(21, 7, 5, 51, '2016-03-18 16:11:08', NULL, 1, 0),
(22, 7, 5, 53, '2016-03-18 16:11:27', NULL, 1, 0),
(23, 7, 6, 56, '2016-03-20 16:10:10', NULL, 1, 0),
(24, 5, 7, 58, '2016-03-20 16:34:00', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `post_ID` int(10) unsigned NOT NULL,
  `text` text,
  `author` int(10) unsigned NOT NULL,
  `time` datetime DEFAULT NULL,
  `likes` int(10) unsigned DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_ID`, `text`, `author`, `time`, `likes`) VALUES
(1, 'Gle', 5, '2016-02-18 14:01:18', 0),
(2, 'Tekst posta', 5, '2016-02-22 00:00:00', 0),
(4, 'Neki post 2', 2, '2016-02-18 00:00:00', 0),
(5, '&#60;  &#60;&#62;', 5, '2016-02-26 08:47:23', 0),
(6, '<.<', 5, '2016-02-26 08:51:59', 0),
(7, '&gt;.&gt;', 5, '2016-02-26 08:52:57', 0),
(8, '>.', 5, '2016-02-26 09:04:45', 0),
(9, '>.', 5, '2016-02-26 09:04:45', 0),
(10, '', 5, '2016-02-26 09:05:13', 0),
(11, '>.>', 5, '2016-02-26 09:05:23', 0),
(12, '', 5, '2016-02-26 09:06:27', 0),
(13, '&#60;.&#60;', 5, '2016-02-26 09:07:02', 0),
(14, '&gt;.&lt;', 5, '2016-02-26 09:07:26', 0),
(15, '&lt;.&lt; &gt;.&gt; &lt; &lt; &lt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &lt;3', 5, '2016-02-26 09:11:20', 0),
(16, '&lt;script&gt;alert(&quot;yo&quot;);&lt;/script&gt;', 5, '2016-02-26 09:11:43', 0),
(17, ' ? ! &quot; # $ % &amp; / ( ) = * + - @ &euro; { }  ~ ', 5, '2016-02-26 09:12:54', 0),
(18, '', 5, '2016-02-26 09:27:50', 0),
(19, '&#039; or sleep(5); #', 5, '2016-02-26 09:30:33', 0),
(21, 'https://www.youtube.com/watch?v=N-dz1WJ6V-E daaaamn', 5, '2016-03-01 17:47:01', 0),
(29, 'adadsadsadasdsd', 5, '2016-03-16 21:43:59', 0),
(46, 'sapa', 7, '2016-03-18 15:11:14', 0),
(47, 'pokusa\n', 7, '2016-03-18 15:11:57', 0),
(48, 'lilaks\n', 7, '2016-03-18 15:12:49', 0),
(49, 'sapa mapa\n', 7, '2016-03-18 15:16:36', 0),
(50, 'čiča miča', 7, '2016-03-18 15:17:17', 0),
(51, 'koliba\n', 7, '2016-03-18 15:17:39', 0),
(52, '&scaron;iba\n', 7, '2016-03-18 15:18:00', 0),
(53, 'bla, bla, bla\n', 7, '2016-03-18 15:44:05', 0),
(56, 'lolololo', 7, '2016-03-18 15:57:31', 0),
(62, 'sve bas\n', 7, '2016-03-18 16:06:07', 0),
(64, 'sve bas lakoo', 5, '2016-03-18 16:09:20', 0),
(65, 'kurac palac', 7, '2016-03-18 16:10:10', 0),
(66, '&Scaron;apa, mapa\n', 7, '2016-03-20 16:08:22', 0),
(67, 'adadadsad', 7, '2016-03-20 19:42:35', 0),
(68, 'sadadsad', 7, '2016-03-20 19:43:02', 0),
(69, 'moj status\n', 7, '2016-03-20 19:46:32', 0),
(70, 'statuuuus\n', 7, '2016-03-20 19:48:00', 0),
(71, 'sadsadasd', 7, '2016-03-20 19:52:56', 0),
(72, 'sadsada', 7, '2016-03-20 19:53:08', 0),
(73, 'sadasdsad', 7, '2016-03-20 19:53:44', 0),
(74, 'sdadsad', 7, '2016-03-20 19:57:11', 0),
(75, 'sadad', 7, '2016-03-20 20:06:59', 0),
(76, 'sadasd', 7, '2016-03-20 20:11:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `scripts_files`
--

CREATE TABLE IF NOT EXISTS `scripts_files` (
  `script_ID` int(11) NOT NULL,
  `file_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `file_description` text COLLATE utf8_bin NOT NULL,
  `file_path` varchar(400) COLLATE utf8_bin NOT NULL,
  `uploaded` date NOT NULL,
  `course_ID` int(11) unsigned DEFAULT NULL,
  `author` int(11) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `scripts_files`
--

INSERT INTO `scripts_files` (`script_ID`, `file_name`, `file_description`, `file_path`, `uploaded`, `course_ID`, `author`) VALUES
(2, 'neki file', 'adadada', '//', '2016-03-01', 1, 7),
(3, 'neki file 2', 'adadada', '//', '2016-03-02', 3, 7),
(4, 'neki file 3', 'adadada', '//', '2016-03-02', 1, 7),
(5, 'neki file 4', 'adadada', '//', '2016-03-02', 6, 7),
(6, 'neki file 5', 'adadada', '//', '2016-03-02', 6, 7),
(7, 'neki file 10', 'adadada', '//', '2016-03-02', 1, 7),
(8, 'neki file 11', 'adadada', '//', '2016-03-02', 1, 7),
(9, 'neki file 4', 'adadada', '//', '2016-03-02', 5, 7);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
  `subject_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `max_years` int(10) unsigned NOT NULL DEFAULT '3',
  `type_of_study` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_ID`, `name`, `max_years`, `type_of_study`) VALUES
(2, 'Turistički menadžement', 4, 2),
(3, 'Informacijski i poslovni sustavi', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject_in_college`
--

CREATE TABLE IF NOT EXISTS `subject_in_college` (
  `subject` int(10) unsigned NOT NULL,
  `college` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject_in_college`
--

INSERT INTO `subject_in_college` (`subject`, `college`) VALUES
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `test_trigger`
--

CREATE TABLE IF NOT EXISTS `test_trigger` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `test_trigger`
--

INSERT INTO `test_trigger` (`id`, `text`, `time`) VALUES
(8, 'halo', '2016-02-26 13:14:25'),
(9, 'devetaaaa', '2016-02-26 13:15:02');

-- --------------------------------------------------------

--
-- Table structure for table `tribal_states`
--

CREATE TABLE IF NOT EXISTS `tribal_states` (
  `tribal_state_ID` int(10) unsigned NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `postal_code` varchar(5) DEFAULT NULL COMMENT 'first postal code of tribal state'
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tribal_states`
--

INSERT INTO `tribal_states` (`tribal_state_ID`, `name`, `postal_code`) VALUES
(2, 'Zagrebačka', '10000'),
(3, 'Krapinsko-zagorska', '49000'),
(4, 'Sisačko-moslavačka', '44000'),
(5, 'Karlovačka', '47000'),
(6, 'Varaždinska', '42000'),
(7, 'Koprivničko-križevačka', '48000'),
(8, 'Bjelovarsko-bilogorska', '43000'),
(9, 'Primorsko-goranska', '51000'),
(10, 'Ličko-senjska', '53000'),
(11, 'Virovitičko-podravska', '33000'),
(12, 'Požeško-slavonska', '34000'),
(13, 'Brodsko-posavska', '35000'),
(14, 'Zadarska', '23000'),
(15, 'Osječko-baranjska', '31000'),
(16, 'Šibensko-kninska', '22000'),
(17, 'Vukovarsko-srijemska', '32000'),
(18, 'Splitsko-dalmatinska', '21000'),
(19, 'Istarska', '52000'),
(20, 'Dubrovačko-neretvanska', '20000'),
(21, 'Međimurska', '40000'),
(22, 'Grad Zagreb', '10255');

-- --------------------------------------------------------

--
-- Table structure for table `types_of_study`
--

CREATE TABLE IF NOT EXISTS `types_of_study` (
  `type_of_study_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types_of_study`
--

INSERT INTO `types_of_study` (`type_of_study_ID`, `name`) VALUES
(1, 'Preddiplomski sveučilišni studij'),
(2, 'Preddiplomski stručni studij'),
(3, 'Diplomski sveučilišni studij');

-- --------------------------------------------------------

--
-- Table structure for table `universities`
--

CREATE TABLE IF NOT EXISTS `universities` (
  `university_ID` int(10) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `universities`
--

INSERT INTO `universities` (`university_ID`, `name`) VALUES
(2, 'Sveučilište u Zagrebu'),
(3, 'Veleučilište u Šibeniku'),
(4, 'Sveučilište Sjever'),
(9, 'Pokušaj');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` int(10) unsigned NOT NULL,
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
  `profile_picture` varchar(100) DEFAULT 'page_imgs/default.jpg',
  `secret_word` varchar(50) DEFAULT NULL,
  `college_year` varchar(45) DEFAULT NULL,
  `full_time_student` tinyint(4) DEFAULT '1' COMMENT 'if 1 then true, else false',
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `home_city` int(10) unsigned DEFAULT NULL,
  `type_of_study` int(10) unsigned DEFAULT NULL,
  `user_status` tinyint(4) DEFAULT '0' COMMENT 'online = 1 / offline = 0',
  `login_time` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `email`, `password`, `university`, `college`, `city`, `subject`, `blocked`, `activated`, `role`, `mobile_number`, `unique_ID`, `gender`, `registered_at`, `birthday_date`, `num_wrong_logins`, `dorm`, `profile_picture`, `secret_word`, `college_year`, `full_time_student`, `name`, `surname`, `home_city`, `type_of_study`, `user_status`, `login_time`) VALUES
(1, 'test@foi.com', '123', 2, 3, 3, 3, 0, 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, NULL, 1, 'name_proba', 'surname_proba', 3, NULL, 0, '2016-03-20 19:13:34'),
(2, 'neki@mail.com', NULL, NULL, NULL, NULL, NULL, 0, 0, 3, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, 'user', NULL, NULL, NULL, 0, NULL),
(5, 'dsokac@foi.hr', 'danisoka992', 2, 3, 3, 3, 0, 0, 3, '0981658704', '6019832100160922635', 'M', '2016-02-18 12:07:48', '1992-10-20 00:00:00', 0, NULL, 'page_imgs/default.jpg', 'Soky', '3', 1, 'Danijel', 'Sokač_test', 3, 1, 0, '2016-03-18 15:59:39'),
(6, 'admin@ivra.hr', 'karatehr', 2, 3, 3, 3, 0, 0, 3, '08765432', '6019832100160922639', 'M', '2016-03-03 18:26:58', '1988-03-17 00:00:00', 0, NULL, 'page_imgs/default.jpg', 'Sokač', '2', 1, 'Danijel', 'Sokač', 3, 1, 0, '2016-03-20 20:56:09'),
(7, 'testni@foi.hr', 'nekipass92', 3, 3, 4, 2, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'page_imgs/default.jpg', NULL, '2', 1, 'Ivo', 'Ivić', NULL, NULL, 0, '2016-03-23 20:44:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_ID`), ADD KEY `cities_trbal_stateFK_idx` (`tribal_state`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`college_ID`), ADD KEY `colleges_universityFK_idx` (`university`), ADD KEY `colleges_cityFK_idx` (`city`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_ID`), ADD KEY `comments_authorFK_idx` (`author`), ADD KEY `comments_postFK_idx` (`post`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_ID`), ADD KEY `companies_tribal_stateFK_idx` (`tribal_state`), ADD KEY `companies_cityFK_idx` (`city`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_ID`), ADD KEY `courses_subjectFK_idx` (`subject`);

--
-- Indexes for table `dorms`
--
ALTER TABLE `dorms`
  ADD PRIMARY KEY (`dorm_ID`), ADD KEY `dorms_cityFK_idx` (`city`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`owner`,`friend`), ADD KEY `friends_friendFK_idx` (`friend`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_ID`), ADD KEY `notifications_ownerFK_idx` (`owner`), ADD KEY `notifications_senderFK_idx` (`sender`), ADD KEY `notifications_link_targetFK_idx` (`link_target`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_ID`), ADD KEY `posts_authorFK_idx` (`author`);

--
-- Indexes for table `scripts_files`
--
ALTER TABLE `scripts_files`
  ADD PRIMARY KEY (`script_ID`), ADD KEY `sf_autorFK_idx` (`author`), ADD KEY `sf_courseFK_idx` (`course_ID`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_ID`), ADD KEY `subjects_type_of_studyFK_idx` (`type_of_study`);

--
-- Indexes for table `subject_in_college`
--
ALTER TABLE `subject_in_college`
  ADD PRIMARY KEY (`subject`,`college`), ADD KEY `subject_in_college_collegeFK_idx` (`college`);

--
-- Indexes for table `test_trigger`
--
ALTER TABLE `test_trigger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tribal_states`
--
ALTER TABLE `tribal_states`
  ADD PRIMARY KEY (`tribal_state_ID`);

--
-- Indexes for table `types_of_study`
--
ALTER TABLE `types_of_study`
  ADD PRIMARY KEY (`type_of_study_ID`);

--
-- Indexes for table `universities`
--
ALTER TABLE `universities`
  ADD PRIMARY KEY (`university_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`), ADD KEY `users_universityFK_idx` (`university`), ADD KEY `users_collegeFK_idx` (`college`), ADD KEY `users_cityFK_idx` (`city`), ADD KEY `users_subjectFK_idx` (`subject`), ADD KEY `users_dormFK_idx` (`dorm`), ADD KEY `users_home_cityFK_idx` (`home_city`), ADD KEY `users_type_of_studyFK_idx` (`type_of_study`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `college_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `dorms`
--
ALTER TABLE `dorms`
  MODIFY `dorm_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `scripts_files`
--
ALTER TABLE `scripts_files`
  MODIFY `script_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tribal_states`
--
ALTER TABLE `tribal_states`
  MODIFY `tribal_state_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `types_of_study`
--
ALTER TABLE `types_of_study`
  MODIFY `type_of_study_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `universities`
--
ALTER TABLE `universities`
  MODIFY `university_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
ADD CONSTRAINT `cities_trbal_stateFK` FOREIGN KEY (`tribal_state`) REFERENCES `tribal_states` (`tribal_state_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `colleges`
--
ALTER TABLE `colleges`
ADD CONSTRAINT `colleges_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `colleges_universityFK` FOREIGN KEY (`university`) REFERENCES `universities` (`university_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
ADD CONSTRAINT `comments_authorFK` FOREIGN KEY (`author`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `comments_postFK` FOREIGN KEY (`post`) REFERENCES `posts` (`post_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
ADD CONSTRAINT `companies_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `companies_tribal_stateFK` FOREIGN KEY (`tribal_state`) REFERENCES `tribal_states` (`tribal_state_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
ADD CONSTRAINT `courses_subjectFK_idx` FOREIGN KEY (`subject`) REFERENCES `subject_in_college` (`subject`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dorms`
--
ALTER TABLE `dorms`
ADD CONSTRAINT `dorms_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
ADD CONSTRAINT `friends_friendFK` FOREIGN KEY (`friend`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `friends_ownerFK` FOREIGN KEY (`owner`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
ADD CONSTRAINT `notifications_link_targetFK` FOREIGN KEY (`link_target`) REFERENCES `comments` (`comment_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `notifications_ownerFK` FOREIGN KEY (`owner`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `notifications_senderFK` FOREIGN KEY (`sender`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
ADD CONSTRAINT `posts_authorFK` FOREIGN KEY (`author`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `scripts_files`
--
ALTER TABLE `scripts_files`
ADD CONSTRAINT `sf_autorFK_idx` FOREIGN KEY (`author`) REFERENCES `users` (`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `sf_courseFK_idx` FOREIGN KEY (`course_ID`) REFERENCES `courses` (`course_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
ADD CONSTRAINT `subjects_type_of_studyFK` FOREIGN KEY (`type_of_study`) REFERENCES `types_of_study` (`type_of_study_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `subject_in_college`
--
ALTER TABLE `subject_in_college`
ADD CONSTRAINT `subject_in_college_collegeFK` FOREIGN KEY (`college`) REFERENCES `colleges` (`college_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `subject_in_college_subjectFK` FOREIGN KEY (`subject`) REFERENCES `subjects` (`subject_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `users_cityFK` FOREIGN KEY (`city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `users_collegeFK` FOREIGN KEY (`college`) REFERENCES `colleges` (`college_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `users_dormFK` FOREIGN KEY (`dorm`) REFERENCES `dorms` (`dorm_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `users_home_cityFK` FOREIGN KEY (`home_city`) REFERENCES `cities` (`city_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `users_subjectFK` FOREIGN KEY (`subject`) REFERENCES `subjects` (`subject_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `users_type_of_studyFK` FOREIGN KEY (`type_of_study`) REFERENCES `types_of_study` (`type_of_study_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `users_universityFK` FOREIGN KEY (`university`) REFERENCES `universities` (`university_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

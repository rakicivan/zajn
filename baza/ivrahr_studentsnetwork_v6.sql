-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2016 at 03:13 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 7.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ivrahr_studentsnetwork`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `tribal_state` int(10) UNSIGNED DEFAULT NULL,
  `universities` text COMMENT 'universities in the city formated as string of IDs separated with commas'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `colleges` (
  `college_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `abbr` varchar(10) DEFAULT NULL,
  `university` int(10) UNSIGNED NOT NULL,
  `city` int(10) UNSIGNED NOT NULL,
  `email_domain` varchar(10) DEFAULT NULL COMMENT '<college_domain>.hr  e.g. foi.hr,fsb.hr,ffzg.hr',
  `types_of_study` text COMMENT 'id of types of study as one string separated by comma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `comments` (
  `comment_ID` int(10) UNSIGNED NOT NULL,
  `text` text,
  `author` int(10) UNSIGNED DEFAULT NULL,
  `likes` int(10) UNSIGNED DEFAULT '0',
  `post` int(10) UNSIGNED DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_ID`, `text`, `author`, `likes`, `post`, `time`) VALUES
(1, 'aha', 5, 0, 1, '2016-02-19 15:39:19'),
(2, 'drugi', 5, 0, 1, '2016-02-19 15:39:27');

-- --------------------------------------------------------

--
-- Table structure for table `comming_soon_subscriptions`
--

CREATE TABLE `comming_soon_subscriptions` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(321) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `unique_ID` varchar(11) DEFAULT NULL,
  `city` int(10) UNSIGNED DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `tribal_state` int(10) UNSIGNED DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL COMMENT 'only phone numbers, without dashes and spaces',
  `fax_number` varchar(15) DEFAULT NULL COMMENT 'only fax number without dashes and spaces',
  `contact_person` varchar(200) DEFAULT NULL,
  `password` text,
  `registered_at` datetime DEFAULT NULL,
  `num_wrong_logins` int(11) DEFAULT '0',
  `blocked` tinyint(4) DEFAULT '0',
  `activation_link` text,
  `activated` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dorms`
--

CREATE TABLE `dorms` (
  `dorm_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dorms`
--

INSERT INTO `dorms` (`dorm_ID`, `name`, `city`) VALUES
(2, 'Studentski dom Varaždin', 3);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `owner` int(10) UNSIGNED NOT NULL COMMENT 'The person who is owner of friend list e.g. the person who sent friend request.',
  `friend` int(10) UNSIGNED NOT NULL COMMENT 'The person who accepted the friend request.',
  `time` datetime DEFAULT NULL,
  `blocked` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_ID` int(10) UNSIGNED NOT NULL,
  `text` text,
  `author` int(10) UNSIGNED NOT NULL,
  `time` datetime DEFAULT NULL,
  `likes` int(10) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_ID`, `text`, `author`, `time`, `likes`) VALUES
(1, 'Gle', 5, '2016-02-18 14:01:18', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `max_years` int(10) UNSIGNED NOT NULL DEFAULT '3',
  `type_of_study` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_ID`, `name`, `max_years`, `type_of_study`) VALUES
(2, 'Turistički menadžement', 3, 2),
(3, 'Informacijski i poslovni sustavi', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject_in_college`
--

CREATE TABLE `subject_in_college` (
  `subject` int(10) UNSIGNED NOT NULL,
  `college` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject_in_college`
--

INSERT INTO `subject_in_college` (`subject`, `college`) VALUES
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tribal_states`
--

CREATE TABLE `tribal_states` (
  `tribal_state_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `postal_code` varchar(5) DEFAULT NULL COMMENT 'first postal code of tribal state'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `types_of_study` (
  `type_of_study_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `universities` (
  `university_ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `universities`
--

INSERT INTO `universities` (`university_ID`, `name`) VALUES
(2, 'Sveučilište u Zagrebu'),
(3, 'Veleučilište u Šibeniku'),
(4, 'Sveučilište Sjever');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_ID` int(10) UNSIGNED NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` text COMMENT 'hashed password',
  `university` int(10) UNSIGNED DEFAULT NULL,
  `college` int(10) UNSIGNED DEFAULT NULL,
  `city` int(10) UNSIGNED DEFAULT NULL,
  `subject` int(10) UNSIGNED DEFAULT NULL,
  `blocked` tinyint(4) DEFAULT '0',
  `activated` tinyint(4) DEFAULT '0',
  `role` int(11) DEFAULT '3' COMMENT '1 - admin\n2 - moderator\n3 - user',
  `mobile_number` varchar(30) DEFAULT NULL,
  `unique_ID` varchar(20) DEFAULT NULL COMMENT 'if full-time student then unique_ID is xica, else index number',
  `gender` char(1) DEFAULT NULL COMMENT 'M - for male\nF - for female',
  `registered_at` datetime DEFAULT NULL,
  `birthday_date` datetime DEFAULT NULL,
  `num_wrong_logins` int(10) UNSIGNED DEFAULT '0',
  `dorm` int(10) UNSIGNED DEFAULT NULL,
  `profile_picture` varchar(100) DEFAULT 'page_imgs/default.jpg',
  `secret_word` varchar(50) DEFAULT NULL,
  `college_year` varchar(45) DEFAULT NULL,
  `full_time_student` tinyint(4) DEFAULT '1' COMMENT 'if 1 then true, else false',
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `home_city` int(10) UNSIGNED DEFAULT NULL,
  `type_of_study` int(10) UNSIGNED DEFAULT NULL,
  `user_status` tinyint(4) DEFAULT '0' COMMENT 'online = 1 / offline = 0',
  `login_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `email`, `password`, `university`, `college`, `city`, `subject`, `blocked`, `activated`, `role`, `mobile_number`, `unique_ID`, `gender`, `registered_at`, `birthday_date`, `num_wrong_logins`, `dorm`, `profile_picture`, `secret_word`, `college_year`, `full_time_student`, `name`, `surname`, `home_city`, `type_of_study`, `user_status`, `login_time`) VALUES
(1, 'test@foi.com', '123', 2, 3, 3, 3, 0, 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, NULL, 1, 'name_proba', 'surname_proba', 3, NULL, 0, NULL),
(2, 'neki@mail.com', NULL, NULL, NULL, NULL, NULL, 0, 0, 3, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, 'user', NULL, NULL, NULL, 0, NULL),
(5, 'dsokac@foi.hr', 'danisoka992', 2, 3, 3, 3, 0, 0, 3, '0981658704', '6019832100160922635', 'M', '2016-02-18 12:07:48', '1992-10-20 00:00:00', 0, NULL, 'page_imgs/default.jpg', 'Soky', '3', 1, 'Danijel', 'Sokač', 3, 1, 0, '2016-02-19 15:39:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_ID`),
  ADD KEY `cities_trbal_stateFK_idx` (`tribal_state`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`college_ID`),
  ADD KEY `colleges_universityFK_idx` (`university`),
  ADD KEY `colleges_cityFK_idx` (`city`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_ID`),
  ADD KEY `comments_authorFK_idx` (`author`),
  ADD KEY `comments_postFK_idx` (`post`);

--
-- Indexes for table `comming_soon_subscriptions`
--
ALTER TABLE `comming_soon_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_ID`),
  ADD KEY `companies_tribal_stateFK_idx` (`tribal_state`),
  ADD KEY `companies_cityFK_idx` (`city`);

--
-- Indexes for table `dorms`
--
ALTER TABLE `dorms`
  ADD PRIMARY KEY (`dorm_ID`),
  ADD KEY `dorms_cityFK_idx` (`city`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`owner`,`friend`),
  ADD KEY `friends_friendFK_idx` (`friend`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_ID`),
  ADD KEY `posts_authorFK_idx` (`author`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_ID`),
  ADD KEY `subjects_type_of_studyFK_idx` (`type_of_study`);

--
-- Indexes for table `subject_in_college`
--
ALTER TABLE `subject_in_college`
  ADD PRIMARY KEY (`subject`,`college`),
  ADD KEY `subject_in_college_collegeFK_idx` (`college`);

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
  ADD PRIMARY KEY (`user_ID`),
  ADD KEY `users_universityFK_idx` (`university`),
  ADD KEY `users_collegeFK_idx` (`college`),
  ADD KEY `users_cityFK_idx` (`city`),
  ADD KEY `users_subjectFK_idx` (`subject`),
  ADD KEY `users_dormFK_idx` (`dorm`),
  ADD KEY `users_home_cityFK_idx` (`home_city`),
  ADD KEY `users_type_of_studyFK_idx` (`type_of_study`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `college_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `comming_soon_subscriptions`
--
ALTER TABLE `comming_soon_subscriptions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dorms`
--
ALTER TABLE `dorms`
  MODIFY `dorm_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tribal_states`
--
ALTER TABLE `tribal_states`
  MODIFY `tribal_state_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `types_of_study`
--
ALTER TABLE `types_of_study`
  MODIFY `type_of_study_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `universities`
--
ALTER TABLE `universities`
  MODIFY `university_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_authorFK` FOREIGN KEY (`author`) REFERENCES `users` (`user_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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

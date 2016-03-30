-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `tribal_states`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tribal_states` ;

CREATE TABLE IF NOT EXISTS `tribal_states` (
  `tribal_state_ID` INT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NULL,
  `postal_code` VARCHAR(5) NULL,
  PRIMARY KEY (`tribal_state_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cities` ;

CREATE TABLE IF NOT EXISTS `cities` (
  `city_ID` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NULL,
  `tribal_state` INT UNSIGNED NULL,
  `universities` TEXT NULL COMMENT 'universities separated with commas',
  PRIMARY KEY (`city_ID`),
  INDEX `cities_trbal_stateFK_idx` (`tribal_state` ASC),
  CONSTRAINT `cities_trbal_stateFK`
    FOREIGN KEY (`tribal_state`)
    REFERENCES `tribal_states` (`tribal_state_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colleges`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `colleges` ;

CREATE TABLE IF NOT EXISTS `colleges` (
  `college_ID` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `abbr` VARCHAR(10) NULL,
  `university` INT UNSIGNED NOT NULL COMMENT '@<college_domain>.hr\n\ne.g. @foi.hr , @ffzg.hr , @fer.hr , @fsbhr',
  `city` INT UNSIGNED NOT NULL,
  `email_domain` VARCHAR(10) NULL,
  PRIMARY KEY (`college_ID`),
  INDEX `colleges_cityFK_idx` (`city` ASC),
  CONSTRAINT `colleges_cityFK`
    FOREIGN KEY (`city`)
    REFERENCES `cities` (`city_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `companies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `companies` ;

CREATE TABLE IF NOT EXISTS `companies` (
  `company_ID` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NULL,
  `unique_ID` VARCHAR(11) NULL,
  `city` INT UNSIGNED NULL,
  `address` VARCHAR(150) NULL,
  `zip_code` VARCHAR(10) NULL,
  `tribal_state` INT UNSIGNED NULL,
  `email` VARCHAR(322) NULL,
  `phone_number` VARCHAR(15) NULL COMMENT 'only phone numbers, without dashes and spaces',
  `fax_number` VARCHAR(15) NULL COMMENT 'only fax number without dashes and spaces',
  `contact_person` VARCHAR(200) NULL,
  `password` TEXT NULL,
  `registered_at` DATETIME NULL,
  `num_wrong_logins` INT NULL DEFAULT 0,
  `blocked` TINYINT NULL,
  `activation_link` TEXT NULL DEFAULT NULL,
  `activated` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`company_ID`),
  INDEX `companies_tribal_stateFK_idx` (`tribal_state` ASC),
  INDEX `companies_cityFK_idx` (`city` ASC),
  CONSTRAINT `companies_tribal_stateFK`
    FOREIGN KEY (`tribal_state`)
    REFERENCES `tribal_states` (`tribal_state_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `companies_cityFK`
    FOREIGN KEY (`city`)
    REFERENCES `cities` (`city_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postal_codes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postal_codes` ;

CREATE TABLE IF NOT EXISTS `postal_codes` (
  `postal_code_ID` INT UNSIGNED NOT NULL,
  `postal_code` VARCHAR(5) NULL,
  `tribal_state` INT UNSIGNED NULL,
  PRIMARY KEY (`postal_code_ID`),
  INDEX `postal_codes_tribal_stateFK_idx` (`tribal_state` ASC),
  CONSTRAINT `postal_codes_tribal_stateFK`
    FOREIGN KEY (`tribal_state`)
    REFERENCES `tribal_states` (`tribal_state_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_categories` ;

CREATE TABLE IF NOT EXISTS `job_categories` (
  `job_category_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`job_category_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `working_hours`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `working_hours` ;

CREATE TABLE IF NOT EXISTS `working_hours` (
  `working_hour_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`working_hour_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobs` ;

CREATE TABLE IF NOT EXISTS `jobs` (
  `job_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `job_category` INT UNSIGNED NULL,
  `students_number` INT UNSIGNED NULL,
  `employment_type` TEXT NULL COMMENT 'set of emplyment type ids separated with commas',
  `sign_deadline` DATETIME NULL,
  `tribal_state` INT UNSIGNED NULL,
  `city` INT UNSIGNED NULL,
  `start_time` DATETIME NULL,
  `working_hours` INT UNSIGNED NULL,
  `driving_license` TEXT NULL DEFAULT NULL,
  `payment` FLOAT NULL DEFAULT NULL,
  `notice_payment` TEXT NULL DEFAULT NULL,
  `experience` INT NULL DEFAULT NULL COMMENT '0-no, 1-yes, 2-wanted',
  `sanitary` TINYINT NULL DEFAULT 0 COMMENT '1-yes , 0-no',
  `job_description` VARCHAR(150) NULL,
  `job_notice` TEXT NULL,
  `end_time` DATETIME NULL,
  `featured_colleges` TEXT NULL,
  `working_experience` INT NULL DEFAULT 0 COMMENT 'if 0 then no experience or wanted',
  `pc_usage` TINYINT NULL COMMENT '1-basic, 2-good, 3-advanced',
  `program_knowledge` TEXT NULL COMMENT 'string of program id followed by knowledge level separated with commas\nexample: 1:0,2:2,3:1\n\n0-basic, 1-good, 2-advanced',
  `driving_license_notice` VARCHAR(200) NULL,
  `foreign_languages` TEXT NULL COMMENT 'foregin language id follwed by number which represents knowledge level separated with commas :  1:0,2:2,3:1\n\nknowledge level: 0 - basic , 1 - good , 2-advanced',
  `skills` TEXT NULL,
  `hidden` TINYINT NULL DEFAULT 0,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `author` INT UNSIGNED NULL,
  `cancelled` TINYINT NULL DEFAULT 0,
  `deleted` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`job_ID`),
  INDEX `jobs_job_categoryFK_idx` (`job_category` ASC),
  INDEX `jobs_tribal_stateFK_idx` (`tribal_state` ASC),
  INDEX `jobs_cityFK_idx` (`city` ASC),
  INDEX `jobs_working_hoursFK_idx` (`working_hours` ASC),
  CONSTRAINT `jobs_job_categoryFK`
    FOREIGN KEY (`job_category`)
    REFERENCES `job_categories` (`job_category_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs_tribal_stateFK`
    FOREIGN KEY (`tribal_state`)
    REFERENCES `tribal_states` (`tribal_state_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs_cityFK`
    FOREIGN KEY (`city`)
    REFERENCES `cities` (`city_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs_working_hoursFK`
    FOREIGN KEY (`working_hours`)
    REFERENCES `working_hours` (`working_hour_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `employment_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `employment_types` ;

CREATE TABLE IF NOT EXISTS `employment_types` (
  `employment_type_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`employment_type_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `driving_licenses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `driving_licenses` ;

CREATE TABLE IF NOT EXISTS `driving_licenses` (
  `driving_license_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(10) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`driving_license_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `programs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `programs` ;

CREATE TABLE IF NOT EXISTS `programs` (
  `program_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `program` VARCHAR(100) NULL,
  PRIMARY KEY (`program_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foreign_languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `foreign_languages` ;

CREATE TABLE IF NOT EXISTS `foreign_languages` (
  `foreign_language` INT NOT NULL,
  `language` VARCHAR(100) NULL,
  PRIMARY KEY (`foreign_language`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `student_histories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_histories` ;

CREATE TABLE IF NOT EXISTS `student_histories` (
  `student_history_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL,
  `working_hours_sum` INT NULL,
  `student` INT UNSIGNED NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`student_history_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `working_histories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `working_histories` ;

CREATE TABLE IF NOT EXISTS `working_histories` (
  `working_history_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job` INT UNSIGNED NULL,
  `worked_hours` INT UNSIGNED NULL,
  `company` INT UNSIGNED NULL,
  `start_time` DATETIME NULL,
  `end_time` DATETIME NULL,
  `created_at` DATETIME NULL,
  `working_position` VARCHAR(150) NULL,
  `student_history` INT UNSIGNED NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`working_history_ID`),
  INDEX `working_histories_jobFK_idx` (`job` ASC),
  INDEX `working_histories_companyFK_idx` (`company` ASC),
  INDEX `working_histories_student_historyFK_idx` (`student_history` ASC),
  CONSTRAINT `working_histories_jobFK`
    FOREIGN KEY (`job`)
    REFERENCES `jobs` (`job_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `working_histories_companyFK`
    FOREIGN KEY (`company`)
    REFERENCES `companies` (`company_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `working_histories_student_historyFK`
    FOREIGN KEY (`student_history`)
    REFERENCES `student_histories` (`student_history_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reports` ;

CREATE TABLE IF NOT EXISTS `reports` (
  `report_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `report` VARCHAR(120) NULL,
  PRIMARY KEY (`report_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `student_reports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_reports` ;

CREATE TABLE IF NOT EXISTS `student_reports` (
  `student_report_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company` INT UNSIGNED NULL,
  `student` INT UNSIGNED NULL,
  `report` INT UNSIGNED NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `notice` VARCHAR(100) NULL,
  PRIMARY KEY (`student_report_ID`),
  INDEX `student_reports_reportFK_idx` (`report` ASC),
  INDEX `student_reports_company_idx` (`company` ASC),
  CONSTRAINT `student_reports_reportFK`
    FOREIGN KEY (`report`)
    REFERENCES `reports` (`report_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `student_reports_companyFK`
    FOREIGN KEY (`company`)
    REFERENCES `companies` (`company_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` INT UNSIGNED NOT NULL,
  `email` VARCHAR(322) NULL,
  `password` TEXT NULL COMMENT 'hashed password',
  `university` INT UNSIGNED NULL,
  `college` INT UNSIGNED NULL,
  `city` INT UNSIGNED NULL,
  `subject` INT UNSIGNED NULL,
  `blocked` TINYINT NULL DEFAULT 0,
  `activated` TINYINT NULL DEFAULT 0,
  `role` INT NULL DEFAULT 3 COMMENT '1 - admin\n2 - moderator\n3 - user',
  `mobile_number` VARCHAR(30) NULL,
  `unique_ID` VARCHAR(20) NULL COMMENT 'if full-time student then unique_ID is xica, else index number',
  `gender` CHAR NULL COMMENT 'M - for male\nF - for female',
  `registered_at` DATETIME NULL,
  `birthday_date` DATETIME NULL,
  `num_wrong_logins` INT UNSIGNED NULL DEFAULT 0,
  `dorm` INT UNSIGNED NULL,
  `profile_picture` VARCHAR(100) NULL,
  `secret_word` VARCHAR(50) NULL,
  `college_year` VARCHAR(45) NULL,
  `full_time_student` TINYINT NULL DEFAULT 1 COMMENT 'if 1 then true, else false',
  `name` VARCHAR(50) NULL,
  `surname` VARCHAR(50) NULL,
  `home_city` INT UNSIGNED NULL,
  `type_of_study` INT UNSIGNED NULL,
  PRIMARY KEY (`user_ID`),
  INDEX `users_universityFK_idx` (`university` ASC),
  INDEX `users_collegeFK_idx` (`college` ASC),
  INDEX `users_cityFK_idx` (`city` ASC),
  INDEX `users_subjectFK_idx` (`subject` ASC),
  INDEX `users_dormFK_idx` (`dorm` ASC),
  INDEX `users_home_cityFK_idx` (`home_city` ASC),
  INDEX `users_type_of_studyFK_idx` (`type_of_study` ASC),
  CONSTRAINT `users_universityFK`
    FOREIGN KEY (`university`)
    REFERENCES `universities` (`university_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_collegeFK`
    FOREIGN KEY (`college`)
    REFERENCES `colleges1` (`college_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_cityFK`
    FOREIGN KEY (`city`)
    REFERENCES `cities1` (`city_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_subjectFK`
    FOREIGN KEY (`subject`)
    REFERENCES `subjects` (`subject_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_dormFK`
    FOREIGN KEY (`dorm`)
    REFERENCES `dorms` (`dorm_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_home_cityFK`
    FOREIGN KEY (`home_city`)
    REFERENCES `cities1` (`city_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_type_of_studyFK`
    FOREIGN KEY (`type_of_study`)
    REFERENCES `types_of_study` (`type_of_study_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `signed_students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `signed_students` ;

CREATE TABLE IF NOT EXISTS `signed_students` (
  `signed_student` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student` INT UNSIGNED NULL,
  `signed_at` DATETIME NULL,
  `job` INT UNSIGNED NULL,
  `accepted` TINYINT NULL DEFAULT 0,
  `declined` TINYINT NULL DEFAULT 0 COMMENT '1 - employer declined, 2 - student declined, 3 - system declined',
  `status_changed_at` DATETIME NULL,
  PRIMARY KEY (`signed_student`),
  INDEX `signed_student_studentFK_idx` (`student` ASC),
  INDEX `signed_student_jobFK_idx` (`job` ASC),
  CONSTRAINT `signed_student_studentFK`
    FOREIGN KEY (`student`)
    REFERENCES `users` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `signed_student_jobFK`
    FOREIGN KEY (`job`)
    REFERENCES `jobs` (`job_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_requests` ;

CREATE TABLE IF NOT EXISTS `job_requests` (
  `job_request_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sender` VARCHAR(10) NULL COMMENT 'student or employer',
  `student_ID` INT UNSIGNED NULL,
  `company_ID` INT UNSIGNED NULL,
  `signed_student_request` INT UNSIGNED NULL,
  `read` TINYINT NULL DEFAULT 0,
  `created_at` DATETIME NULL,
  `text` VARCHAR(100) NULL,
  PRIMARY KEY (`job_request_ID`),
  INDEX `job_requests_student_IDFK_idx` (`student_ID` ASC),
  INDEX `job_requests_company_IDFK_idx` (`company_ID` ASC),
  CONSTRAINT `job_requests_student_IDFK`
    FOREIGN KEY (`student_ID`)
    REFERENCES `users` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `job_requests_company_IDFK`
    FOREIGN KEY (`company_ID`)
    REFERENCES `companies` (`company_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

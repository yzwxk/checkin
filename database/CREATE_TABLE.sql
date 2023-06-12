CREATE DATABASE daily_checkin;

USE daily_checkin;

CREATE TABLE `checkin_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL COMMENT '打卡任务id。默认为修戒打卡。',
  `type` int(11) NOT NULL COMMENT '0 // 日常打卡； 1 //补签',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;